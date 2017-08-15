var serverConfig ={};
//serverConfig ["ip"] = "localhost" ; 
serverConfig ["ip"] = "127.0.0.1" ; 
serverConfig ["port"] = 27017 ; 
serverConfig ["database"] = "localhost"; 
var ObjectId = require("mongodb").ObjectID;
var mongo = require('mongodb');
var _db ; 
var op = 0 ; 
var gcm = require('node-gcm');


var senderGcmIds=[{}]
var sender;				 

GridFs = function GridFs(){};
GridFs.prototype.upload = function(fileBuffer, fileData,  callback){
	var conn = new Connection(); 
	conn.connect(function(err, db){
		if(err){callback(err);}
		else{

			var grid = new mongo.Grid(db, 'fs');
			grid.put(fileBuffer, fileData, function(err, fileInfo){
				callback(err, fileInfo);
			});
		}
	});
}
GridFs.prototype.update = function(fileId, fileBuffer,fileData, callback){

}
GridFs.prototype.view= function(fileId, callback){
	var conn = new Connection();
	console.log('now Connection');
	conn.connect(function(err, db){
		if(err){callback(err);}
			else{
				console.log(fileId);
				var grid = new mongo.Grid(db, 'fs');
				grid.get(fileId, function(err, fileBuffer){
					callback(err, fileBuffer);
				});
			}
	});
}
GridFs.prototype.remove = function(fileId, callback){

}
exports.GridFs = GridFs;

Connection = function Connection(){};
Connection.prototype.connect = function(callback){
	try{
			if (_db){callback(null, _db);}
			else{
				var MongoClient = require('mongodb').MongoClient;
				MongoClient.connect("mongodb://" + serverConfig.ip + ":" + serverConfig.port+ "/" +serverConfig.database , 
				function(err, db){
				if (err) {callback(err);} 
				else{
				_db = db;
				callback(null, _db);
				op++;
				console.log(op);
				_db.on('close', function(){
					_db=null;
					
					});
				_db.on('error' , function(){
					
					_db=null; 
					});
				}}
				);
			}
	}
	catch(ex){
		console.log(ex);
	}
};
exports.Connection  = Connection; 


Srv = function Srv(){};

Srv.prototype.errlog= function(page, section, error){
	var srv = new Connection(); 
	srv.connect(function(err, db){
		if (err) console.log(err); 
		var errors = db.collection("errlog");
		errors.insert({ts:new Date(), "page":page, "section":section, "error":error},
						 function(err, docs){
						 	if (err) console.log(err); 
						 	console.log(JSON.stringify(docs));  

		});
	});
}; 

Srv.prototype.getSession= function(sessionId, callback){
	var srv = new Connection(); 
	srv.connect(function(err, db){
		if (err) callback(err); 
		var loginSession = db.collection('loginSession'); 
		loginSession.findOne({"_id":new ObjectId(sessionId)} , function(err, doc){
			if (err) callback(err);
			else{ 
			callback(null, doc);  }
		}); 
	});
};
Srv.prototype.createSession= function(username,domain,role, callback){
	var srv = new Connection(); 
	
	srv.connect(function(err, db){
		
		if (err) callback(err); 
		var loginSession = db.collection("loginSession");
		loginSession.insert({"username":username, "domain":domain, 
		 					  "startTime":new Date(), state:"active", "role":role}, 
		 	                  function(err, result){
		 	                  	if (err) callback(err);
		 	                  	callback(null, result) ;  

		});			
	});
};
Srv.prototype.endSession= function(sessionId, callback){
	var srv = new Connection(); 
	srv.connect(function(err, db){
		if (err) callback(err); 
		db.loginSession.update({"_id":new ObjectId(sessionId)},
							   {state:"inactive", endTime:new Date()}, 
							   		function(err, doc){ }
							   );
	});
};

exports.Srv = Srv; 

var Connection = require('../routes/server').Connection;
var conn = new Connection();

var ccc =function ccc() {};

ccc.prototype.sendGCM = function(messageJson, registrationIds, applicationName,callback ) {
	// get the sender gcmId according to the application name
	
	switch(applicationName){
		case senderGcmIds[0]["app"]:
						sender=new gcm.Sender(senderGcmIds[0]["gcmId"]);
						break;
		case senderGcmIds[1]["app"]:
						sender=new gcm.Sender(senderGcmIds[1]["gcmId"]);
						console.log("vs");		
						break;
		case senderGcmIds[2]["app"]:
						sender=new gcm.Sender(senderGcmIds[2]["gcmId"]);
						break;
		case senderGcmIds[3]["app"]:
						sender=new gcm.Sender(senderGcmIds[3]["gcmId"]);
						break;
		case senderGcmIds[4]["app"]:
						sender=new gcm.Sender(senderGcmIds[4]["gcmId"]);
						break;				

	}

	var message = new gcm.Message();
	message["collapseKey"]='Update Articles'; // check what can go there
	message["delayWhileIdle"]=true;
	message["priority"]=3;
	message["timeToLive"]=36000;
	message["data"]=messageJson; //  as per the send request
	message["hasData"]=true;
	sender.send(message, registrationIds, 4, function(err, status){
		if (err) {callback(err);}
		else {
			//console.log(status);
			callback(null, status);
			
		}
	});
};

ccc.prototype.sendSms = function(message,mobileNumber,callback){
 var request = require('request');
 
 request.get("http://nimbusit.co.in/api/swsend.asp?username=username&password=password&sender=TSDEMO&sendto="+mobileNumber+"&message="+message,function(error,response,body){
     if(error){
       callback(error,null);
     }
     else{
       callback(null,body);
     }
 });

}

ccc.prototype.sendSmsByAgent = function(message,mobileNumber,username,password,senderId,smsUrl,callback){
 var values = {"message":message,"mobileNumber":mobileNumber,"username":username,"senderId":senderId,"ts":new Date()};
 var request = require('request');
 request.get(smsUrl+"?username="+username+"&password="+password+"&sender="+senderId.toUpperCase()+"&sendto="+mobileNumber+"&message="+message,function(error,response,body){
     if(error){
       callback(error,null);
     }
     else{
     	conn.connect(function(err,db){
     		if(err){
     			console.log(err);
     		}  	
     		else{
     			var sentSms = db.collection("sentSms");
     			sentSms.insert(values,function(err,doc){
     				if(err){
     					console.log(err);
     				}
     				else{
     					console.log("Sms sent successfully");
     				}
     			});
     		}
       	});
       	
       	callback(null,body);
     }
 });

}

exports.ccc = ccc; 
