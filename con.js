

Date.prototype.getMonthWeek = function(){
    var firstDay = new Date(this.getFullYear(), this.getMonth(), 1).getDay();
    return Math.ceil((this.getDate() + firstDay)/7);
}
Date.prototype.getYearWeek = function() {
  var date = new Date(this.getTime());
   date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                        - 3 + (week1.getDay() + 6) % 7) / 7);
}
var defaultDate=new Date();
var datepickerOption={ minDate: 0,changeMonth: true,
     changeYear: true,
     "showAnim":"blind",
     "dateFormat":"dd/mm/yy",
     // "maxDate": new Date(defaultDate.getFullYear(),defaultDate.getMonth()+1,defaultDate.getDate()),
     onClose: function(selectedDate) {
       
      }
 }

var getDateDiff=function(firstDate,secondDate){
   
   var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
   firstDate = new Date(firstDate) || new Date();
   secondDate = new Date(secondDate) || new Date();
   var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
   return diffDays;
}
var createTens=function(n){
  return(n<9)?"0"+n:n;
}
var covertToDate=function(date){
  // alert(date)
  date=date.split("/");
  return new Date(date[2],date[1]-1,date[0]);
}
var dateArray=function(date,client){
  var fdate=new Date(date);
  // alert(fdate)
  var da=[]
  da[0]=fdate.getFullYear();
  da[1]=createTens(fdate.getMonth()+1);
  da[2]=createTens(fdate.getDate());  
  return (client)?da.reverse().join("/"):da;

}

var timeArray= function(date,client){
  var fdate=new Date(date);
  // alert(fdate)
  var da=[]
  da[0]=fdate.getSeconds();
  da[1]=createTens(fdate.getMinutes()+1);
  da[2]=createTens(fdate.getHours());  
  return (client)?da.reverse().join(":"):da;
}

function jDate(date, time) {
    var d = date.split("/");
    var t = time.split(":");
    return new Date(d[2], parseInt(d[1]) - 1, d[0], (t[0] || 00), (t[1] || 00), (t[2] || 00))
}

var incrementDate=function(date,no){
    no=no ||1
    var tomorrow = new Date(date);
    return new Date(tomorrow.setDate(tomorrow.getDate() + no));
}
var findDifferent=function(date,type){
 var today=new Date(); 
 var intervalPeriod=["Once","Weekly","Monthly","Quarterly","Half Yearly","Yearly"] 
 var index=intervalPeriod.indexOf(type);
 var year=date.getFullYear()-today.getFullYear();
 var d=date.getDate()-today.getDate();
 switch(index){
  case 1:
    return ((year*53)+date.getYearWeek()-today.getYearWeek())+1;
  break;
  case 2:
    return ((year*12)+date.getMonth()-today.getMonth())+1;
  break;
  case 3:
     var totalMonth=(year*12)+(date.getMonth()-today.getMonth());
     return parseInt(totalMonth/3) +1;
  break;
  case 4:
    var totalMonth=(year*12)+(date.getMonth()-today.getMonth());
     return parseInt(totalMonth/6) +1;
  break;
  case 5:
  var totalMonth=(year*12)+(date.getMonth()-today.getMonth());
     return year +1;
  break;
 }
}
var doFilter=function(enddate,type){
 // var edate=dateArray(covertToDate(enddate)) 
 return findDifferent(covertToDate(enddate),type);
}

$["isMobile"]=function(n,code,length){
  code=code || "91";
  length= length || 10;
 
 alert(n)
}


function leapYear(year){
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}
var autoDate=function(id){
   var date=[];
   for (var i = 1; i <= 31; i++){
      var d=(i<10)?"0"+i:""+i;
      date.push(d)
   }
   $(id).autocomplete({
      source: date
    });
}
var autoMonth=function(id,date){
   var month=[];
   date=(date || "01");
   for (var i = 1; i <= 12; i++){
      var m=(i<10)?"0"+i:""+i;
      month.push(m)
   }
  $(id).autocomplete({
      source: month
    });
}

var autoYear=function(id,date,month){
   var year=[];
   date=(date)?$(date).val():"01";
   month=(month)?$(month).val():"01";
// alert(date);
// alert(month)
   for (var i = 1950; i <= 2030; i++){
      var y=(i<10)?"0"+i:""+i;
      if(month=="02" && date=="01"){
        if(!leapYear(i))
          // alert("con")
          continue;
      }
      year.push(y)
   }
   $(id).autocomplete({
      source: year
    });
}
$(document).on("click",".leftButton,#addQueue,#closeQuo,#addQuotation, .taskClick,li ",function(){

// })
  // var target = $(event.target);

  // if (!target.attr('id').match(/^mydiv/) && target.parents('#mydiv').length == 0) {
  //   $('#mydiv').hide();
  // }
  
  // if($.session.get("usertype")=="client"){
  if($(this)["context"]["className"]!="ui-menu-item"){
   $(".center").animate({
          "width": "54.5%"
        }, 200);
       $(".right").animate({
            "width": "29.5%"
        }, 200);
       $("#fileupload").animate({
            "right": "25%"
        }, 200);
     // }
   }
});


// var getSelectVal=function(){
//   var values={};
//   console.log("called")
//   $(document).on("change",arguments[0],function(){
//     for (var i = 1; i < arguments.length; i++) {
//       values[arguments[i]]=$(arguments[0]).attr(arguments[i]);
//     };
//   })
//   values["val"]=$(arguments[0]).val();
//   return values;
// }
var redirectMethod=function(){var add=window.location.href; if(add.indexOf("trinity")>-1){window.location.href="http://fieldorder.ditscentre.in/index.html";}}
// redirectMethod();
var defaultPage=function(top,top2,state){
  // if($.session.get("usertype")=="client"){
    // alert("sd")
  top2=(top2>0)?"58":top2;
    $(".center").animate({
       "top": top2
    }, 1000);
    $(".doctorName").animate({
       "top": top2
    }, 1000);
    if(state){
        $("#datatableDiv").fadeOut(1000)
    }
    else{
        $("#datatableDiv").fadeIn(1000)   
    }
  // }
}

var dataTableOption={
        "scrollY": window.outerHeight-350,
        "scrollCollapse": true,
        // "paging":         false,
            fixedHeader: {
               header: true,
              footer: true
          },
            "order": [
                [0, 'desc']
            ],
            "lengthMenu": [
                [100, 500, 1000, 5000, 10000, -1],
                [100, 500, 1000, 5000, 10000, "All Record"]
            ],
            stateSave: true

        }

 var dataTableReportOption={
        // "scrollY": window.outerHeight-350,
        "scrollCollapse": true,
        // "paging":         false,
            fixedHeader: {
               header: true,
              footer: true
          },
            "order": [
                [0, 'desc']
            ],
          
            stateSave: true,
            dom: 'Bfrtip',
            buttons: [
                {
                    extend: 'copyHtml5',
                    exportOptions: {
                        columns: [ 0, ':visible' ]
                    }
                },
                {
                    extend: 'excelHtml5',
                    exportOptions: {
                        columns: ':visible'
                    }
                },
                {
                    extend: 'pdfHtml5',
                    exportOptions: {
                        columns: [ 0, 1, 2,3,4 ,5 ]
                    }
                }
                // ,
                // 'colvis'
            ],
              "lengthMenu": [
                [100, 500, 1000, 5000, 10000, -1],
                [100, 500, 1000, 5000, 10000, "All Record"]
            ],

        }       

$("#usernameSpan").html($.session.get("fouserName"));
$("#logout").click(function(){
  localStorage.removeItem("userSessionId");
  window.location.href="index.html";
})

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}


// var ritesh="Ritesh hi";
function load_home(id,page){
    document.getElementById(id).innerHTML='<object width="100%" height="100%" type="text/html" data="'+page+'.html" ></object>';
}

var formatObjectKey = function(str){
  return str.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase() })
}

var processing=true;
var hitServiceAsync = function(url, values, callback) {
  console.log(url);
  // alert(url);
  // console.log(values);
  // console.log($.session.get("userSessionId"));
  $("#errorMessageMainDiv").hide();
  if($.session.get("userSessionId")){
    // alert(processing)
if(processing){
  processing=false;
var status = {
       "state": false,
       "message": "",
       "docs": []
   };
   $.ajax({
       type: "POST",
       cache: false,
       async: true,
       crossdomain: true,
       url: url,
       data: {
           values: JSON.stringify(values),
           sessionId:$.session.get("userSessionId"),
           usertype:$.session.get("usertype")
       },
       success: function(data) {

           status = JSON.parse(data);
           // console.log(status)
           if(status["state"]==false){
              if(status["message"]=="Not a valid sessionId"){
                alert(status["message"]);
                window.location.href="index.html";
              }
           }
           setTimeout(function() {
               processing=true;
               callback(null, status);
           }, 5)
       },
       error: function(xhr, status, error) {
           setTimeout(function() {
            $("#errorMessageMainDiv").show();
            // console.log(JSON.stringify(xhr))
            // $("#errorMessageMainDiv").html(JSON.stringify(xhr));
            $("#errorMessageMainDiv").html("Something went Wrong");
              processing=true;
               callback(error, null);
           }, 5)
       }
   });
}
 }
 else{
  window.location.href="index.html"
 }
}




var hitServiceAsyncOA = function(url, values, callback) {
  // console.log(url);
  // console.log(values);
  // console.log($.session.get("userSessionId"));
  $("#errorMessageMainDiv").hide();
  if($.session.get("userSessionId")){
    // alert(processing)
if(processing){
  processing=false;
var status = {
       "state": false,
       "message": "",
       "docs": []
   };
   $.ajax({
       type: "POST",
       cache: false,
       async: true,
       crossdomain: true,
       url: url,
       data:values,
       success: function(data) {

           status = JSON.parse(data);
           // console.log(status)
           
           setTimeout(function() {
               processing=true;
               callback(null, status);
           }, 5)
       },
       error: function(xhr, status, error) {
           setTimeout(function() {
            $("#errorMessageMainDiv").show();
            // console.log(JSON.stringify(xhr))
            // $("#errorMessageMainDiv").html(JSON.stringify(xhr));
            $("#errorMessageMainDiv").html("Something went Wrong");
              processing=true;
               callback(error, null);
           }, 5)
       }
   });
}
 }
 else{
  window.location.href="index.html"
 }
}

var loadImage=function(imageUrl, divId, imgClass){
  // alert(imageUrl);
  var img = $("<img />").attr('src',imageUrl ).addClass(imgClass).attr("id","img_"+divId)
    .load(function() {
        if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
            console.log(imageUrl)
        } else {
          $(divId).html(img);
        }
    });
}

function previewFile(image,file) { 
// alert("called")
//calls the function named previewFile()
        var preview = document.querySelector('#'+image); //selects the query named img
        var file = document.querySelector('#'+file).files[0]; //sames as here
        var reader = new FileReader();
        console.log(reader);
        reader.onloadend = function() {            
            preview.src = reader.result;        
        }
        if (file) {
            var url = reader.readAsDataURL(file);
            console.log(url);
            //reads the data as a URL
        } else {
            preview.src = "";
        }

}

var getHitServiceAsync = function(url, values, callback) {
  // console.log(url);
  // console.log(values);
  if($.session.get("userSessionId")){
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
       url: "https://www.google.co.in/",
       
       success: function(data) {
           status = JSON.parse(data);
           console.log(status)
           if(status["state"]==false){
              if(status["message"]=="Not a valid sessionId"){
                alert(status["message"])
                window.location.href="index.html";
              }
           }
           setTimeout(function() {
               // console.log(status)
               callback(null, status);
           }, 5)
       },
       error: function(xhr, status, error) {
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


var hitServiceAsyncLogin= function(url, values, callback) {
  // console.log(url);
  // console.log(values);
  // if(localStorage.getItem("sessionId")){
var status = {
       "state": false,
       "message": "",
       "docs": []
   };
   $.ajax({
       type: "POST",
       cache: false,
       async: false,
       crossdomain: true,
       url: url,
       data: {
           values: JSON.stringify(values),
           sessionId:$.session.get("userSessionId"),
           usertype:$.session.get("usertype")
       },
       success: function(data) {
           status = JSON.parse(data);
           // console.log(status["message"])
           setTimeout(function() {
               // console.log(status)
               callback(null, status);
           }, 5)
       },
       error: function(xhr, status, error) {
           setTimeout(function() {
               callback(error, null);
           }, 5)
       }
   });
 // }
 // else{
 //  window.location.href="index.html"
 // }
}

var hitServiceFormDataAsync=function(url,formData,callback){  
formData.append("sessionId",$.session.get("userSessionId"));
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
               var status = JSON.parse(data);
               //console.log(status);
                 setTimeout(function() {
                   // console.log(status)
                   callback(null, status);
               }, 5)
                
             },
               error:function(xhr, status, error){
              setTimeout(function() {
                   callback(error, null);
               }, 5)
             }

      }); 
}

//To calulate local strage size
var sizeOfLocalStorage=function(){
var s=0 
for (var i = 0; i < localStorage.length; i++){
s += JSON.stringify(localStorage.getItem(localStorage.key(i)))
}
return s; 
}
var hitServiceAsyncNABH = function(url, values, callback) {

        var status = {
            "state": false,
            "message": "",
            "docs": []
        };
        $.ajax({
            type: "POST",
            cache: false,
            async: true,
            crossdomain: true,
            url: url,
            data: {
                values: JSON.stringify(values)
            },
            success: function(data) {
                status = JSON.parse(data);
                setTimeout(function() {
                    // console.log(status)
                    callback(null, status);
                }, 5)
            },
            error: function(xhr, status, error) {
                setTimeout(function() {
                    callback(error, null);
                }, 5)
            }
        });
    }
    

    function PrintElem(elem)
    {
        Popup($(elem).html());
    }

    function Popup(data) 
    {
        var mywindow = window.open('', 'my div', 'height=400,width=600');
        mywindow.document.write('<html><head><title>my div</title>');
        /*optional stylesheet*/ //mywindow.document.write('<link rel="stylesheet" href="main.css" type="text/css" />');
        mywindow.document.write('</head><body >');
        mywindow.document.write(data);
        mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10

        mywindow.print();
        mywindow.close();

        return true;
    }
    var createDropDown=function(id,search){
$(document).on("keydown.autocomplete",id,function(e){

  $(id).autocomplete({
          minLength: 0,
              // source: function(request, response) {
              //       var results = $.ui.autocomplete.filter(search, request.term);

              //       if (!results.length) {
              //           console.log("alsdsdfsd");
              //           results = ["NoResultsLabel"];
              //       }

              //       response(results);
              //   },
          source: search,
          focus: function(event, ui) {
              $(id+"").val(ui.item.label);

                $("#searchConsumer-des").val(ui.item.value)
                $("#searchConsumer-index").val(ui.item.icon)
              return false;
          },
          select: function(event, ui) {
              $(id).val(ui.item.label);
              $(id+"-id").val(ui.item.value);
              $(id+"-description").html(ui.item.desc);
              $(id+"-icon").attr("src", "images/" + ui.item.icon);

              return false;
          }
      })
      .autocomplete("instance")._renderItem = function(ul, item) {
          return $("<li>")
              .append("<a class='"+id.substr(1)+"Result' id=" + item.value + " name=" + item.icon + ">" + item.label +"  " + item.desc+ "</a>")
              .appendTo(ul);
      };
    });
  
}
