var express = require('express');
var app = express();
app.set('port', process.env.PORT || 9090);
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = app.get('port');

var request = require('request');
var appmodels = require('../server');

var Chatmessage = appmodels.models.chatmessage;
var Appuser = appmodels.models.appuser;


//594d1f02d50353b80ea055b5 // ritesh mobile
//594e507d47291acf1a8c1233 // ritesh MAC

app.use(express.static('public'));

server.listen(port, function() {
    console.log("Server listening on: http://localhost:%s", port);
});

var usernames = {};
var rooms = [];

var getUsersInRoomNumber = function(roomName, namespace) {
   if (!namespace) namespace = '/';
   var room = io.nsps[namespace].adapter.rooms[roomName];
   console.log(room,"my room")
   if (!room) return null;
   // console.log(room,"my room")
   return room.length;//Object.keys(room.soc).length;
}

var ios_Legacy_Server_Key = 'key=AIzaSyAZ-uI5kZPrEorBlYxvzg_FsdZ3s9hQV8';
var android_Legacy_Server_Key = 'key-eGtR9_qLnA1AjqZInq8';
var fcmUrl = 'https://fcm.googleapis.com/fcm/send';
//data.user._id
function triggerNotification(data, callback) {
   console.log("bc",data);
   Appuser.find({ where : { id:'594d1f02d50353b80ea055b5'} }, function(err, appusers) {
      if (err) {
         console.log(err);
      }
      //console.log(appusers[0].fcmKey); return false;
      console.log(appusers)
      if (appusers && appusers.length > 0) {
         deviceType = (appusers[0].brand=='Apple') ? 'ios':'android';
         data.title = "You have an unread message";
         data.message = data.text;
         data.to = appusers[0].fcmKey;

         console.log('datatose nd',data);

         var options = {
            method: 'POST',
            url: fcmUrl,
            json: true,
            body: data,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': deviceType == 'ios' ? ios_Legacy_Server_Key : android_Legacy_Server_Key
            },
         }
         request(options, function(err, response, body) {
            return callback(err, response);
         });
      }
   });
}


var sendChunkData=function(data,socket,last){

   var whrObj = {
      where : {
         or:[
            {userId: socket.username},
            {toUserId:socket.username}
         ]
      },
      limit:10,
      order: 'created DESC'
   }
   console.log("last",last);
   if(last){
      whrObj.skip=last.length;
      // whrObj.order= 'created';
   }

   console.log("where",JSON.stringify(whrObj));

   Chatmessage.find(whrObj, function(err, result) {
      if (err || !result) {
        console.log(err);
        return;
      }
      console.log("result length",result.length);
      //console.log("chat data",result);
      var result2=result.reverse();
      var earlier_data=[];

      if(!result.length){
         io.sockets.connected[socket.id].emit('earlier_data',earlier_data.reverse());
      }
      result2.forEach(function(d,i){
         //console.log(d.id);
         var nd = {
            "user": { "_id": d.userId, "name": "Ritesh Vish" },
            "createdAt": d.created,
            "chatId": rooms.indexOf(data.user._id),
            "text": d.message,
            "_id": d.id
         }
         earlier_data.push(nd);
         if(last){

            if(result.length-1==i){
               io.sockets.connected[socket.id].emit('earlier_data',earlier_data.reverse());
            }
         }
         else{
            io.sockets.connected[socket.id].emit('user_msg', [nd]);
         }
      })

   });
}

io.sockets.on('connection', function(socket) {

   socket.on('earlier_data', function(data) {
      sendChunkData(data,socket,data.last)
   });


    socket.on('add_user', function (data) {
        var username = data.username;
        var room = data.room;

        if (rooms.indexOf(room) != -1) {
            socket.username = username;
            socket.room = room;
            usernames[username] = username;
            socket.join(room);

            socket.emit('updatechat', 'SERVER', 'You are connected. Start chatting');
            socket.broadcast.to(room).emit('updatechat', {});
        } else {

            socket.emit('updatechat', 'SERVER', 'Please enter valid code.');
        }
    });

   socket.on('create_room', function (data) {
      var new_room = data.user._id;
      var username=data.user._id;
      rooms.push(new_room);
      data.room = new_room;
      socket.username = username;
      socket.room = new_room;
      usernames[username] = username;
      socket.join(new_room);
      var data2={
         text: 'User connected',
         user: { _id:socket.username,username: socket.username+'100' },
          notsave:true,
         createdAt: new Date(),_id: 'temp-id-978932',room: socket.username
      }
      socket.broadcast.emit('customer_support_msg',data2);
      sendChunkData(data,socket,null)
   });



    socket.on('customer_support_msg', function(data) {
        var new_room = data.user._id;
        var username = data.user.username;

        var newData = [{
            "user": { "_id": "robot", "name": "Server" },
            "createdAt": new Date(),
            "chatId": rooms.indexOf(new_room),
            "text": data.text,
            "_id": Math.random()
        }];


        if (rooms.indexOf(new_room) != -1 && false) {
            socket.username = username;
            socket.room = new_room;
            usernames[username] = username;
            socket.join(new_room);
            if(!data.inital){
               socket.broadcast.to(new_room).emit('user_msg', newData);
            }
        } else {
            //send fcm notification to usr.
            triggerNotification(data,function(err,data){
               console.log(err)
               // console.log(data)
            });
            //console.log("asdfasdfasdf asdfgkasdhfkasd fasdhkfhasd ")
            //socket.emit('updatechat', 'SERVER', 'Please enter valid code.');
        }

    });


    socket.on('user_msg', function(data) {
         var new_room = data.user._id;
         var username = data.user._id;
         if (rooms.indexOf(new_room) == -1) {
            rooms.push(new_room);
            data.room = new_room;
            socket.username = username;
            socket.room = data.user._id;
            usernames[username] = username;
            socket.join(new_room);
            console.log(username + ' has connected to this room')
         }

         console.log(getUsersInRoomNumber(new_room));

         if(getUsersInRoomNumber(new_room)>1){
            socket.broadcast.to(new_room).emit('customer_support_msg', data);
         }else{
            //broadcast
            data.broadcast=true;
            socket.broadcast.emit('customer_support_msg', data);
         }
         //
         // io.sockets.in(socket.room).emit('customer_support_msg', socket.username, data);
    });


   socket.on('disconnect', function() {
      if (socket.username !== undefined) {
         var index=rooms.indexOf(socket.username);
         console.log(socket.username," got disconnect")
         rooms.splice(index,1);
         var data= {
            text: 'User disconnect',
            user: {
               _id:socket.username,
               username: socket.username+'100'
            },
            notsave:true,
            createdAt: new Date(),
            _id: 'temp-id-978932',
            room: socket.username
         }

         socket.broadcast.emit('customer_support_msg',data);
         socket.leave(socket.room);
      }
   });

});var express = require('express');
var app = express();
app.set('port', process.env.PORT || 9090);
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = app.get('port');

var request = require('request');
var appmodels = require('../server');

var Chatmessage = appmodels.models.chatmessage;
var Appuser = appmodels.models.appuser;


//594d1f02d50353b80ea055b5 // ritesh mobile
//594e507d47291acf1a8c1233 // ritesh MAC

app.use(express.static('public'));

server.listen(port, function() {
    console.log("Server listening on: http://localhost:%s", port);
});

var usernames = {};
var rooms = [];

var getUsersInRoomNumber = function(roomName, namespace) {
   if (!namespace) namespace = '/';
   var room = io.nsps[namespace].adapter.rooms[roomName];
   console.log(room,"my room")
   if (!room) return null;
   // console.log(room,"my room")
   return room.length;//Object.keys(room.soc).length;
}

var ios_Legacy_Server_Key = 'key=AIzaSyAZ-uI5kZPnrEorBlYxvzg_FsdZ3s9hQV8';
var android_Legacy_Server_Key = 'key=AIzaSyDqbmQuZcLpF7q-eGtR9_qLnA1AjqZInq8';
var fcmUrl = 'https://fcm.googleapis.com/fcm/send';
//data.user._id
function triggerNotification(data, callback) {
   console.log("bc",data);
   Appuser.find({ where : { id:'594d1f02d50353b80ea055b5'} }, function(err, appusers) {
      if (err) {
         console.log(err);
      }
      //console.log(appusers[0].fcmKey); return false;
      console.log(appusers)
      if (appusers && appusers.length > 0) {
         deviceType = (appusers[0].brand=='Apple') ? 'ios':'android';
         data.title = "You have an unread message";
         data.message = data.text;
         data.to = appusers[0].fcmKey;

         console.log('datatose nd',data);

         var options = {
            method: 'POST',
            url: fcmUrl,
            json: true,
            body: data,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': deviceType == 'ios' ? ios_Legacy_Server_Key : android_Legacy_Server_Key
            },
         }
         request(options, function(err, response, body) {
            return callback(err, response);
         });
      }
   });
}


var sendChunkData=function(data,socket,last){

   var whrObj = {
      where : {
         or:[
            {userId: socket.username},
            {toUserId:socket.username}
         ]
      },
      limit:10,
      order: 'created DESC'
   }
   console.log("last",last);
   if(last){
      whrObj.skip=last.length;
      // whrObj.order= 'created';
   }

   console.log("where",JSON.stringify(whrObj));

   Chatmessage.find(whrObj, function(err, result) {
      if (err || !result) {
        console.log(err);
        return;
      }
      console.log("result length",result.length);
      //console.log("chat data",result);
      var result2=result.reverse();
      var earlier_data=[];

      if(!result.length){
         io.sockets.connected[socket.id].emit('earlier_data',earlier_data.reverse());
      }
      result2.forEach(function(d,i){
         //console.log(d.id);
         var nd = {
            "user": { "_id": d.userId, "name": "Ritesh Vish" },
            "createdAt": d.created,
            "chatId": rooms.indexOf(data.user._id),
            "text": d.message,
            "_id": d.id
         }
         earlier_data.push(nd);
         if(last){

            if(result.length-1==i){
               io.sockets.connected[socket.id].emit('earlier_data',earlier_data.reverse());
            }
         }
         else{
            io.sockets.connected[socket.id].emit('user_msg', [nd]);
         }
      })

   });
}

io.sockets.on('connection', function(socket) {

   socket.on('earlier_data', function(data) {
      sendChunkData(data,socket,data.last)
   });


    socket.on('add_user', function (data) {
        var username = data.username;
        var room = data.room;

        if (rooms.indexOf(room) != -1) {
            socket.username = username;
            socket.room = room;
            usernames[username] = username;
            socket.join(room);

            socket.emit('updatechat', 'SERVER', 'You are connected. Start chatting');
            socket.broadcast.to(room).emit('updatechat', {});
        } else {

            socket.emit('updatechat', 'SERVER', 'Please enter valid code.');
        }
    });

   socket.on('create_room', function (data) {
      var new_room = data.user._id;
      var username=data.user._id;
      rooms.push(new_room);
      data.room = new_room;
      socket.username = username;
      socket.room = new_room;
      usernames[username] = username;
      socket.join(new_room);
      var data2={
         text: 'User connected',
         user: { _id:socket.username,username: socket.username+'100' },
          notsave:true,
         createdAt: new Date(),_id: 'temp-id-978932',room: socket.username
      }
      socket.broadcast.emit('customer_support_msg',data2);
      sendChunkData(data,socket,null)
   });



    socket.on('customer_support_msg', function(data) {
        var new_room = data.user._id;
        var username = data.user.username;

        var newData = [{
            "user": { "_id": "robot", "name": "Server" },
            "createdAt": new Date(),
            "chatId": rooms.indexOf(new_room),
            "text": data.text,
            "_id": Math.random()
        }];


        if (rooms.indexOf(new_room) != -1 && false) {
            socket.username = username;
            socket.room = new_room;
            usernames[username] = username;
            socket.join(new_room);
            if(!data.inital){
               socket.broadcast.to(new_room).emit('user_msg', newData);
            }
        } else {
            //send fcm notification to usr.
            triggerNotification(data,function(err,data){
               console.log(err)
               // console.log(data)
            });
            //console.log("asdfasdfasdf asdfgkasdhfkasd fasdhkfhasd ")
            //socket.emit('updatechat', 'SERVER', 'Please enter valid code.');
        }

    });


    socket.on('user_msg', function(data) {
         var new_room = data.user._id;
         var username = data.user._id;
         if (rooms.indexOf(new_room) == -1) {
            rooms.push(new_room);
            data.room = new_room;
            socket.username = username;
            socket.room = data.user._id;
            usernames[username] = username;
            socket.join(new_room);
            console.log(username + ' has connected to this room')
         }

         console.log(getUsersInRoomNumber(new_room));

         if(getUsersInRoomNumber(new_room)>1){
            socket.broadcast.to(new_room).emit('customer_support_msg', data);
         }else{
            //broadcast
            data.broadcast=true;
            socket.broadcast.emit('customer_support_msg', data);
         }
         //
         // io.sockets.in(socket.room).emit('customer_support_msg', socket.username, data);
    });


   socket.on('disconnect', function() {
      if (socket.username !== undefined) {
         var index=rooms.indexOf(socket.username);
         console.log(socket.username," got disconnect")
         rooms.splice(index,1);
         var data= {
            text: 'User disconnect',
            user: {
               _id:socket.username,
               username: socket.username+'100'
            },
            notsave:true,
            createdAt: new Date(),
            _id: 'temp-id-978932',
            room: socket.username
         }

         socket.broadcast.emit('customer_support_msg',data);
         socket.leave(socket.room);
      }
   });

});
