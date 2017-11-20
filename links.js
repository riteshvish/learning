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
sudo nohup mongo-connector -m localhost:27017 -t http://localhost:8983/solr/product -d solr_doc_manager -n solr.product -v --auto-commit-interval=0 &

refs links
https://www.toadworld.com/platforms/nosql/b/weblog/archive/2017/02/03/indexing-mongodb-data-in-apache-solr

make sure your mongo port is runnig as primary

if you find and error please add below and solution above





