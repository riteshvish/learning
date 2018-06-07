
var findProductInSolrDB = function(id, cb) {
  Product.app.models.image.getDataSource().connector.connect(function(err, db) {
    var product = db.collection('product');
    console.log(typeof id);
    var productId = Product.app.models.image.getDataSource().ObjectID(id);
    console.log(typeof productId);
    product.findOne({
      _id: productId
    }, function(err, data) {
      if (data) {
        data.id = data._id;
      }
      // console.log(data);
      cb(err, data)
    })
  });
}

var formatData = function(data, cb) {
  var interaldata = data;
  cb(null, interaldata)
}
Product.findByIdCustom = function(id, filter, cb) {
  //https://stackoverflow.com/questions/30255524/loopback-rest-findbyid-doesnt-work-well
  console.log("id ", " id", id);
  Product.findById(id, filter, function(err, data) {
    console.log(data);
    if (err) {
      return cb(err)
    }
    if (data) {
      return formatData(data, cb)
      // return cb(null, data)
    }
    if (!data) {
      // check into solr database and return data
      console.log("check into solr database and return data");
      // cb(err, data)
      findProductInSolrDB(id, cb)
    }
  });
}

//Define remote method
Product.remoteMethod(
  'findByIdCustom', {
    description: 'Find a model instance by id from the data source.',
    accessType: 'READ',
    accepts: [{
        arg: 'id',
        type: 'string',
        description: 'Model id',
        required: true,
        http: {
          source: 'path'
        }
      },
      {
        arg: 'filter',
        type: 'object',
        description: 'Filter defining fields and include'
      }
    ],
    returns: {
      arg: 'data',
      type: 'user',
      root: true
    },
    http: {
      verb: 'get',
      path: '/:id'
    },
    rest: {
      after: Product.convertNullToNotFoundError
    },
    isStatic: true
  }
);
Product.disableRemoteMethod('findById', true);
