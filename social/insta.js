var baseUrl="http://localhost:3000/api/";
var instaURl='https://www.instagram.com/developer/endpoints/'


console.log("this is get dafsd");
var hitServiceFormDataAsync=function(url,formData,callback){
console.log("hitServiceFormDataAsync ");
var status = {
       "state": false,
       "message": "",
       "docs": []
   };
   // console.log(formData);
        $.ajax({
             type:"POST",
             contentType:false,
             processData:false,
             cache:false,
             async:true,
             crossdomain:true,
             url:url,
             // providing the data as a string
             data:formData,
             success:function(data){
               var status = data;
               //console.log(status);
                 setTimeout(function() {
                   // console.log(status)
                   callback(null, status);
               }, 5)

             },
               error:function(xhr, status, error){
                console.log(xhr);
              setTimeout(function() {
                   callback(error, null);
               }, 5)
             }

      });
}

var getHitServiceAsync = function(url,callback) {
  console.log(url);

  // console.log(values);
  if(localStorage.getItem("access_token")){
var status = {
       "state": false,
       "message": "",
       "docs": []
   };
   $.ajax({
       type: "get",
       cache: false,
       async: false,
       crossdomain: true,
       url: url,

       success: function(data) {
        //  console.log(data);
        //    status = JSON.parse(data);
        //    console.log(status)
        //    if(status["state"]==false){
        //       if(status["message"]=="Not a valid sessionId"){
        //         alert(status["message"])
        //         window.location.href="index.html";
        //       }
        //    }
           setTimeout(function() {
               // console.log(status)
               callback(null, data);
           }, 5)
       },
       error: function(xhr, status, error) {
         console.log(error);
           setTimeout(function() {
               callback(error, null);
           }, 5)
       }
   });
 }
 else{
  window.location.href="index.html"
 }
}


/*
https://api.instagram.com/v1/tags/nofilter/media/recent?access_token=4258541992.838cd52.f261e39b708d421fbb3345489c71fbc3
https://api.instagram.com/v1/users/self/?access_token=1811616265.838cd52.6bc7b7d396d245c9af8ac5c920922d7a
*/
var getSelfDetails=function(access_token){
  var url ='https://api.instagram.com/v1/users/self/?access_token='+access_token;
  console.log(url);
}


var getUserFeed=function(access_token,count){
  // https://api.instagram.com/v1/users/1811616265/media/recent?access_token=1811616265.838cd52.6bc7b7d396d245c9af8ac5c920922d7a&count=10
  // https://api.instagram.com/v1/users/self/media/recent/?access_token=1811616265.838cd52.6bc7b7d396d245c9af8ac5c920922d7a&count=10
  // https://api.instagram.com/v1/users/1811616265/media/recent?access_token=1811616265.838cd52.6bc7b7d396d245c9af8ac5c920922d7a&count=3&max_id=1631934595704283194_1811616265
  count= count || 3;
  if(!access_token){
    console.log("Please enter access_token","default user is kuldeep jadeja");
  }
  access_token= access_token || "1811616265.838cd52.6bc7b7d396d245c9af8ac5c920922d7a"
  var usersId="1811616265";
  var url=  'https://api.instagram.com/v1/users/self/media/recent?access_token='+access_token+'&count='+count;
  return url;
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
