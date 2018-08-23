
=========================================================================================================================================
Angular2-6 form validaion on button click/blur
	import { BrowserModule } from '@angular/platform-browser';
import { NgModule }  from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

	import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'validationApp';
  login: UserOptions = { username: '', password: '',
  "email":"",
  alphanumberic:""
  };
  submitted = false;

  constructor() { }

  onLogin(form: NgForm) {
    this.submitted = true;
    if (form.valid) {

      alert("j,s")
    }
  }


}

	
	<div>
  <form #loginForm="ngForm" class="page-form">
    <input [(ngModel)]="login.email" name="email" type="text" #email="ngModel" spellcheck="false" placeholder="email" autocapitalize="off" required pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$" />
    <span [hidden]="email.valid || submitted == false" color="danger" padding-left>
				Email is required
		</span><br>

    <input [(ngModel)]="login.username" name="username" type="text" #username="ngModel" placeholder="username" spellcheck="false" autocapitalize="off" required/>


    <span [hidden]="username.valid || submitted == false" color="danger" padding-left>
				Username is required
			</span><br>


    <input [(ngModel)]="login.password" placeholder="password" name="password" type="password" #password="ngModel" required/>
    <span [hidden]="password.valid || submitted == false" color="danger" padding-left>
				Password is required
		</span><br>
    <input [(ngModel)]="login.alphanumberic" placeholder="alphanumberic" name="alphanumberic" pattern="^[a-zA-Z0-9]*$" type="text" #alphanumberic="ngModel" required/>
    <span [hidden]="alphanumberic.valid || submitted == false" color="danger" padding-left>
				alphanumberic is required
		</span><br>
    <button ion-button (click)="onLogin(loginForm)" type="submit" block>Login</button>
    <br>

  </form>
</div>
=========================================================================================================================================
Convert JSON to CSV
	http://jsfiddle.net/hybrid13i/JXrwM/
	
	$(document).ready(function(){
    $('button').click(function(){
        var data = $('#txt').val();
        if(data == '')
            return;
        
        JSONToCSVConvertor(data, "Vehicle Report", true);
    });
});

function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    
    var CSV = '';    
    //Set Report title in first row or line
    
    CSV += ReportTitle + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";
        
        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {
            
            //Now convert each value to string and comma-seprated
            row += index + ',';
        }

        row = row.slice(0, -1);
        
        //append Label row with line break
        CSV += row + '\r\n';
    }
    
    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);
        
        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {        
        alert("Invalid data");
        return;
    }   
    
    //Generate a file name
    var fileName = "MyReport_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");   
    
    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    
    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    
    
    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");    
    link.href = uri;
    
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

=========================================================================================================================================
Getting list of all children from adjacency tree
https://wiki.postgresql.org/wiki/Getting_list_of_all_children_from_adjacency_tree
	
	
CREATE OR REPLACE FUNCTION get_all_hierarchy_array(use_parent text) RETURNS text[] AS $$
DECLARE
    process_parents text[] := ARRAY[ use_parent ];
    children text[] := '{}';
    new_children text[];
BEGIN
    WHILE ( array_upper( process_parents, 1 ) IS NOT NULL ) LOOP
        new_children := ARRAY( SELECT agent_num FROM table_name WHERE rep_to = ANY( process_parents ) AND agent_num <> ALL( children ) );
        children := children || new_children;
        process_parents := new_children;
    END LOOP;
    RETURN children;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION get_all_agent_hierarchy_product_mix(use_parent text)
RETURNS TABLE (
data_ulip numeric,
data_par numeric,
data_non_par numeric    
)
AS $$
DECLARE
   process_parents text[] := ARRAY[ use_parent ];
   children text[] := '{}';
   new_children text[];
    return_data text[];
BEGIN
   WHILE ( array_upper( process_parents, 1 ) IS NOT NULL ) LOOP
       new_children := ARRAY( SELECT agent_num FROM table_name WHERE rep_to = ANY( process_parents ) AND agent_num <> ALL( children ) );
       children := children || new_children;
       process_parents := new_children;
   END LOOP;
    RETURN QUERY SELECT sum(cast(ulip as numeric)),sum(cast(par as numeric)),sum(cast(non_par as numeric)) FROM table_name WHERE agent_num = ANY( children ) OR agent_num=use_parent ;

END;
$$ LANGUAGE plpgsql;

=========================================================================================================================================


https://blog.mwaysolutions.com/2014/06/05/10-best-practices-for-better-restful-api/
=========================================================================================================================================
Git Repository Forking


Creating and Forking a Repository:

Create Project Repository (Main Repo)
Add branches master, staging and dev in Main Repo
Fork Repository (Fork Repo)


Cloning Repository and Working with Fork Repo:

Clone Main Repo: git clone <main-repo-link>
Rename Main Repo from 'origin' to 'upstream': git remote rename origin upstream
Add Fork Repo in remote: git remote add origin <fork-repo-link>
Verify Remote Repository Tracks: git remote -v
          Look for following output:
          origin <fork-repo-link> (fetch)
          origin <fork-repo-link> (push)
          upstream <main-repo-link> (fetch)
          upstream <main-repo-link> (push)



Creating a New Branch and Working with it:

Create New Branch in Main Repo (upstream)
Fetch All Branches in your Local Repo and Checkout New Branch: git fetch && git checkout <branch-name>
Push New Branch to Fork Repo (origin): git push origin <branch-name>
Push All Commits to Fork Repo (origin)
On Work Completion, Create a Pull Request from Fork Repo to Main Repo for Same Branch
=========================================================================================================================================

// create user for mongo
db.createUser( { user: "leadmanager", pwd: "leadmanager", roles: [{ role: "readWrite", db: "digitalmodule" }]} )

=========================================================================================================================================
remove product form solr
curl solrurl/collection/update?commit=true -H "Content-type: text/xml" --data-binary '<delete><query>_id:5a54d1c6204cc5c75ea62eef</query></delete>'



=========================================================================================================================================
Node Custom Logger
var fs = require('fs');
app.use(function loggerMiddleware(req, res, next) {
  const start = Date.now();
  req.time = start;
  res.once('finish', () => {
    var elapsedMS = Date.now() - start
    var data = {
      "status": res.statusCode,
      "message": res.statusMessage,
      "content-length": res._headers["content-length"],
      "host": res.req.headers["host"],
      "ip": res.req.ip,
      "method": res.req.method,
      "url": res.req.url,
      "user-agent": res.req.headers["user-agent"],
      "request-time": res.req.time,
      "respond-time": start + elapsedMS,
      "elapse-time": elapsedMS
    }
    console.log(data);
    console.log(req.method, req.url, `${elapsedMS}ms done`);
    var nick = "testingsfasd";
    var file = './log/' + nick + '.log';
    var text = JSON.stringify(data) + ',\r\n';
    fs.appendFile(file, text, function(err) {
      if (err) return console.log(err);
      console.log('successfully appended "' + text + '"');
    });

  });
  next();
});

=========================================================================================================================================
var year = 2016;
var mS = ['jan', 'feb', 'mar', 'apr', 'may', 'june', 'july', 'aug', 'sept', 'oct', 'nov', 'dec'];

function getDaysInMonth(m, y) {
  return /8|3|5|10/.test(--m) ? 30 : m == 1 ? (!(y % 4) && y % 100) || !(y % 400) ? 29 : 28 : 31;
}
var getNextDate = function(month, previous) {
  var index = mS.indexOf(month);
  if (index < 0) {
    process.exit();
  }
  console.log(index);
  var days = getDaysInMonth(index + 1, year)
  var getNextMonth = function() {

    if (index == 11) {
      year++;
      return mS[0]
    }
    return mS[index + 1]

  }
  var next = getNextMonth()
  return {
    current: mS[index],
    previous: mS[(index - 1) < 0 ? 11 : index - 1],
    days: days,
    start: new Date(year, index, 1),
    end: new Date(year, index, days, 23, 59, 59),
    next: next
  }
}
=========================================================================================================================================
 var modelCollection = Model.getDataSource().connector.collection(Model.modelName);
 modelCollection.distinct("status", {},function(err, records) {})
		
Shared data with query in spread sheet
=QUERY(Articles!A:Z,"SELECT * WHERE D > 0")

=========================================================================================================================================

var queue = [];
var active = false;

var check = function() {
  if (!active && queue.length > 0) {
    var f = queue.shift();
    f();
  }
}

var fakeAsync = function(param, cb) {
  console.log("time new", new Date());
  setTimeout(function() {
    console.log("done! ", param);
    cb();
  }, 5000);
}

var invoke = function(param) {
  queue.push(function() {
    active = true;
    fakeAsync(param, function() {
      active = false;
      check();
    });
  });
  check();
}

invoke("a");
invoke("b");
invoke("c");
=========================================================================================================================================


Mongo dump and restore (limit data, different dump folder)
facts 
it will save docs in collections with same id and details 
if you try to save same id you will get error eg _id_ dup key: { : ObjectId('5a3772412cbaf40fbf0f8102') } 
remove -g eg -q '{username: "riteshvish"}'; for full collection dump

mongodump -o /Users/Ritesh/Documents/workspace/accio/mongodump/ -d 'database_name' -c 'collection_name' -q '{username: "riteshvish"}';
mongorestore --collection people --db accounts /Users/Ritesh/Documents/workspace/mongodump/database_name/collection_name.bson
=========================================================================================================================================
https://github.com/angular/angular/issues/19009
angular remove hash
https://www.youtube.com/watch?v=_roIN2uNn68
.htaccess
=========================================================================================================================================
var getDeviceName = function() {
			if (/Android|webOS|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
				return 'android';
			} else if (/BlackBerry/i.test(navigator.userAgent)) {
				return 'blackberry';
			} else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
				return 'apple';
			} else {
				return 'system';
			}
		}

=========================================================================================================================================
var facebook verification
please sub apps
check mail
{
query: {
hub.mode: "subscribe",
hub.challenge: "304864324",
hub.verify_token: "thisisnewappjustfortesting"
}
}
=========================================================================================================================================
For Background
https://www.pexels.com/
For icon images
https://icons8.com/
For sending transaction mail
https://sendgrid.com/
=========================================================================================================================================
ionic creator grid
  <div class="row">
 <div class="col col-50">1</div> 
 <div class="col col-50">2</div> 
 </div>

=========================================================================================================================================
Loopback
lb-ng ../server/server.js js/lb-services.js
=========================================================================================================================================
App banner
https://github.com/ain/smartbanner.js
http://www.informit.com/articles/article.aspx?p=2301787&seqNum=3
=========================================================================================================================================
var addMonth=function(number){ number=number || 1; var d = new Date(); var d2=new Date(d.setMonth(d.getMonth() + number)).toISOString(); return d2 }
var diffDate=function(start,end){	var startDate = new Date(start);var endDate   = new Date(end);return (endDate.getTime() - startDate.getTime()) / 1000;}

=========================================================================================================================================
Get Hash tags from string
var comments="#chair #decor #furniture #furnitureinspiration fasds sadfa #d # # #style";
var hashtags=comment.split("#").map(function(b2){ var c=b2.split(" "); if(c[0]) { return c[0]}}).filter(function(b2){return b2})

addLinkToHashTag
var comment="It's time to say hello to a good night's sleep with pillows from #PorticoNewYork. 💤💤💤 Discover the pillow type that suits you best. . . . . . #Sleep #Peaceful #Pillow #PillowTalk #PillowSecrets #PorticoNewYork #PorticoIndia #Fluffy #Comfort #Cozy #Dreams #MemoryFoam #BambooCharcoal #Love #Trend #Trending #White #Fusion #GreenTea #Health #GetHealthy #Information #Tips #Help #Ergonomy #Lifestyle #Bedding";
var addLinkToHashTag=function(message){
  return message.replace(/#(\w+)/g, "<a href='$1'>#$1</a>");
}
console.log(addLinkToHashTag(comment));
console.log( comment.replace(/#(\w+)/g, "<a href='$1'>#$1</a>") );
=========================================================================================================================================
Angular CLI Deployment: Host Your Angular 2 App on Heroku
https://medium.com/@ryanchenkie_40935/angular-cli-deployment-host-your-angular-2-app-on-heroku-3f266f13f352
=========================================================================================================================================
Facebook Graph Api Explorer
https://developers.facebook.com/tools/explorer/
=========================================================================================================================================
-l  LOGFILE      Logs the forever output to LOGFILE
-o  OUTFILE      Logs stdout from child script to OUTFILE
-e  ERRFILE      Logs stderr from child script to ERRFILE
For example:

forever start -o out.log -e err.log my-script.js
=========================================================================================================================================
Create Native Mobile And Web App With Single Codebase Using Angular2 And Nativescript
http://shripalsoni.com/blog/create-native-mobile-and-web-app-with-single-codebase-using-angular2-and-nativescript/
=========================================================================================================================================
  
https://plnkr.co/edit/iFXRkJWVZ9tQ9i6mxmuf?p=preview (JsonCustomInputComponent)
http://blog.rangle.io/angular-2-ngmodel-and-custom-form-components/

https://medium.com/react-native-training/react-native-animations-using-the-animated-api-ebe8e0669fae
https://code.tutsplus.com/tutorials/practical-animations-in-react-native--cms-27567
https://tutorialzine.com/2015/12/creating-your-first-desktop-app-with-html-js-and-electron
https://medium.com/@Jpoliachik/react-native-s-layoutanimation-is-awesome-4a4d317afd3e
https://gist.githubusercontent.com/Jpoliachik/0dd83689646d1051b0bc/raw/b6234af3c4169cc9d1329b8a0e5bfccca84b9b67/index.ios.js
https://github.com/vikrantsharma123/ios-inshorts-view
http://embed.plnkr.co/9luTng/?show=preview
http://plnkr.co/edit/mSz2fqjTzR69wp3FKuzP?p=preview
https://github.com/start-angular/SB-Admin-BS4-Angular-4
https://stackoverflow.com/questions/23770672/strongloop-loopback-model-find-with-or-condition-on-where-filter
https://github.com/aksonov/react-native-router-flux/commit/0ef1f7a19ca30d99e1892595da5be67a15c8fc22
http://moduscreate.com/react_native_custom_components_ios/
https://medium.com/@yushulx/react-native-bridging-modules-for-android-from-scratch-c651eeee7872
https://www.youtube.com/watch?v=u9EGy1AJHsc


React call child method
https://github.com/kriasoft/react-starter-kit/issues/909
<ImageSlide  ref={ref => (this.child = ref)}/> // for react-native
<Child onRef={ref => (this.child = ref)} /> //for reactjs
https://github.com/FaridSafi/react-native-gifted-chat/issues
https://github.com/FaridSafi/react-native-gifted-chat/issues/513

{
  howt to create custom react native module
  new "react-native-my-fancy":"file:../MyFancy",
  where npm and app in save folder (MyFancy in npm name)
  react-native-create-library link (https://github.com/frostney/react-native-create-library)
  integation link (https://medium.com/@yushulx/react-native-bridging-modules-for-android-from-scratch-c651eeee7872)
}

 https://www.youtube.com/watch?v=bi7ow5NGC-U ((Updated 2017) Connect to Amazon EC2 using PuTTY private key on Windows)
{
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/
https://askubuntu.com/questions/815896/type-echo-is-not-known-on-line-1-in-source-list-etc-apt-sources-list-d-mongod
after getting error
deb [rch=amd64,amd64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse
}
{
https://www.youtube.com/watch?v=59W5ZHPbwgo (Enable Disable aws EC2 Ports)
}
          http://embed.plnkr.co/mMVsbT/ (Angular 2 Custom Input File Component)
https://www.barbarianmeetscoding.com/blog/2016/03/29/getting-started-with-angular-2-step-by-step-5-forms-and-validation/
http://plnkr.co/edit/aEjlwIKKhcErWAnIhY3C?p=preview
https://bootsnipp.com/snippets/P3Vvm (model pdf)
https://codepen.io/tjoen/pen/vCHfu (Html Invoice)
https://stackoverflow.com/questions/12468471/nodejs-gm-resize-and-pipe-to-response?rq=1
https://stackoverflow.com/questions/35940984/angular2-call-function-of-parent-component
http://markocen.github.io/blog/pre-processing-uploaded-image-on-nodejs.html
{ React Native ScrollView infinity data loading
                              onScroll={(e) => {

          var windowHeight = Dimensions.get('window').height,
            height = e.nativeEvent.contentSize.height,
            offset = e.nativeEvent.contentOffset.y;

          if (windowHeight + offset >= height - 100 && scrollEnds) {

            scrollEnds = false;
            console.warn("scroll");
            //
        
            if(self.props.products){
                self.props.getRecentSearchDataRefresh({
                  refresh: true,
                  skip: self.props.products.length
                });
              }
           
          }

        }}
        scrollEventThrottle={100}
}

Loopback MongoDB Connection
https://loopback.io/doc/en/lb2/Connecting-to-MongoDB.html
npm install --save loopback-connector-mongodb
lb datasource eg
  "mdb": {
    "database": "olivetheory",
    "name": "mdb",
    "hostname": "localhost",
    "connector": "mongodb",
    "allowExtendedOperators": true
  }
after this change the datasource value in model-config.js

How to create Relationship between two model 
ItemsCategories
  "relations": {
    "items": {
      "type": "hasMany",
      "model": "Items",
      "foreignKey": ""      
    }
  },

Items Model
"relations": {
    "itemCategories": {
      "type": "belongsTo",
      "model": "ItemCategories",
      "foreignKey": ""
    }
  },

we have to create relationship in both Model i.e Items and ItemCategories 
then only relationship work

Hooks (Observers){
 module.exports = function(Items) {
  Items.observe('before save', function(ctx, next) {
    if (ctx.isNewInstance) {
      if (ctx.instance) {
        ctx.instance.created = new Date();
        ctx.instance.updated = new Date();
      }
    } else {
      if (ctx.instance) {
        ctx.instance.updated = new Date();
      }
    }
    next();
  });
};
 
}

how to config in local system (imac)
ebook (http://www-eu.apache.org/dist/lucene/solr/ref-guide/apache-solr-ref-guide-7.1.pdf)
download lastest solr from . (http://www-eu.apache.org/dist/lucene/solr/7.1.0/)
install mongo-connector using pip
install solr_doc_manager using pip

solr required replica set run below command 
you can use nohup to run the servive in background
       
https://www.youtube.com/watch?v=3wus5trgi0A
mongod --port 27017 --dbpath /data/db --replSet loSolr
mongod --port 27018 --dbpath /data/db1 --replSet loSolr
mongod --port 27019 --dbpath /data/db2 --replSet loSolr


config={ _id:"loSolr", members:[
    {_id:0,host:"localhost:27017",priority:1},
    {_id:1,host:"localhost:27018",priority:0.5},
    {_id:2,host:"localhost:27019",priority:0.5}
]

}
rs.initiate(config)


configure solr

download solr 
unzip solr
go inside solr folder and run below command
./bin/solr start // it will start solr
to check http://localhost:8983/solr/#/

// create core eg (product)
refs https://stackoverflow.com/questions/38424574/how-to-create-solr-6-cores
ref command sudo /Users/Ritesh/Documents/workspace/solr/solr-7.1.0/bin/solr create -c product -force


create product folder inside solr
then copy conf folder form defauld conf to product conf
and schema.xml
Fields not defined in schema.xml are not indexed.
We also need to configure the org.apache.solr.handler.admin.LukeRequestHandler request handler in the solrconfig.xml. Requests to Solr server are routed through the request handler. Open the solrconfig.xml in the vi editor.
solrconfig.xml
Specify the request handler for the Mongo Connector.
<requestHandler name="/admin/luke" class="org.apache.solr.handler.admin.LukeRequestHandler" />
Also configure the auto commit to true so that Solr auto commits the data from MongoDB after the configured time.
<autoCommit>
    <maxTime>15000</maxTime>
    <openSearcher>true</openSearcher>
</autoCommit>
After modifying the schema.xml and solrconfig.xml the Solr server needs to be restarted.



bin/solr restart

using below command to sync
kill all the mongo-connector 
below command will help to find all mongo-connector running
ps -a | grep mongo-connector
sudo nohup mongo-connector -m localhost:27017 -t http://localhost:8983/solr/product -d solr_doc_manager -n solr.product -v --auto-commit-interval=0 &

refs links
https://www.toadworld.com/platforms/nosql/b/weblog/archive/2017/02/03/indexing-mongodb-data-in-apache-solr

make sure your mongo port is runnig as primary

if you find and error please add below and solution above

--date--
var addMonth=function(number){ number=number || 1; var d = new Date(); var d2=new Date(d.setMonth(d.getMonth() + number)).toISOString(); return d2 }

--date ends here---

-- query String---

by name
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
all query string
function getQueryStrings() { 
  var assoc  = {};
  var decode = function (s) { return decodeURIComponent(s.replace(/\+/g, " ")); };
  var queryString = location.search.substring(1); 
  var keyValues = queryString.split('&'); 

  for(var i in keyValues) { 
    var key = keyValues[i].split('=');
    if (key.length > 1) {
      assoc[decode(key[0])] = decode(key[1]);
    }
  } 

  return assoc; 
} 




----query String ends here ---

--- node preflight error ---
https://stackoverflow.com/questions/22968406/how-to-skip-the-options-preflight-request-in-angularjs

app.use('/', function(req, res, next) {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type,apikey,apiKey,auth_token,isSuperAdmin,totalPages");
    if (req.method.toLowerCase() == "options") {
        res.status(200);
        res.end();
    } else {
        next();
    }
});
The preflight is being triggered by your Content-Type of application/json. The simplest way to prevent this is to set the Content-Type to be text/plain in your case. application/x-www-form-urlencoded & multipart/form-data Content-Types are also acceptable, but youll of course need to format your request payload appropriately.

If you are still seeing a preflight after making this change, then Angular may be adding an X-header to the request as well.
----------------------------

-----------------------------
to stop vertical scroll on webpage
body {
    -webkit-touch-callout: none;
    -webkit-font-smoothing: antialiased;
    font-smoothing: antialiased;
    -webkit-text-size-adjust: none;
    -moz-text-size-adjust: none;
    text-size-adjust: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-tap-highlight-color: transparent;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    margin: 0;
    padding: 0;
    color: #000;
    word-wrap: break-word;
    font-size: 14px;
    font-family: -apple-system;
    font-family: "-apple-system", "Helvetica Neue", "Roboto", "Segoe UI", sans-serif;
    line-height: 20px;
    text-rendering: optimizeLegibility;
    -webkit-backface-visibility: hidden;
    -webkit-user-drag: none;
}
----------------------------
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 // some code..
}
--------------------------------------------------------
  npm install -g nativescript
  623  sudo npm install -g nativescript
  624  vi /Users/Ritesh/.npm/_logs/2017-12-12T14_23_50_345Z-debug.log
  625  sudo npm install -g nativescript
  626  node -v
  627  nvm -v
  628  nvm --version
  629  nvm install node
  630  sudo nvm install node
  631  nvm install node
  632  nvm install node -v
  633  sudo npm install -g nativescript
  634  nvm use node
  635  nvm install --lts
  636  nvm use node
  637  nvm install --lts
  638  node -v
  639  sudo npm install -g nativescript
  640  sudo npm install -g nativescript
  641  sudo npm install -g nativescript --unsafe-perm
  642  sudo npm install -g --unsafe-perm nativescript
  643  sudo npm install -g nativescript
  644  sudo npm install -g nativescript
  645  clear
  646  sudo npm uninstall -g nativescript
  647  sudo npm install -g nativescript
  648  sudo mkdir /Users/Ritesh/.nvm/versions/node/v8.9.3/lib/node_modules/nativescript/docs/html
  649  cd /Users/Ritesh/.nvm/versions/node/v8.9.3/lib/node_modules/nativescript/docs/
  650  ls
  651  cd
  652  clear
  653  sudo npm install -g nativescript
  654  sudo npm uninstall -g nativescript
  655  sudo npm install -g nativescript
  656  tns --version
  657  clear
  658  cd
  659  cd Documents/learning/github/
  660  clear
  661  tns create NativeApp --template nativescript-template-ng-tutorial
  662  cd NativeApp/
  663  tns run ios
  664  tns run ios

  
  
  
