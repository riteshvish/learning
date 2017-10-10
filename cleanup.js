var input={
  a:{},
  b:[],
  c:{
    a:[],
    b:{},
    c:{"name":"ritesh","lastname":"vishwakarma","fiter":{"a":"","b":"Value"}}
  },
  d:null,
  e:[1,null,6,3],
  f:""
}

// console.log(input);
function convert(obj){
  if(obj.constructor==="Array"){
    if(obj.length){
      for (var i = 0; i < obj.length; i++) {
        convert(obj[i])
      }
    }else{
      delete obj;
    }
  }
  else if(typeof obj==="object"){
    var key=Object.keys(obj);
      if(key.length){
        for (var i = 0; i < key.length; i++) {
          if(obj[key[i]]){
            convert(obj[key[i]]);
          }else{
            delete obj
          }
        }
      }
      else {
        delete obj
      }
  }
}
convert(input);
console.log(input)
