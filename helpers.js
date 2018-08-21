
function _getRandomSequenceNumber(){
  console.time("SequenceNumber")
  var arr = []
  var counter=0
  while(arr.length < 12){
  	counter++;
      var randomnumber = Math.floor(Math.random()*12) + 1;
      if(arr.indexOf(randomnumber) > -1) { continue;}
      arr[arr.length] = randomnumber;
  }
  console.timeEnd("SequenceNumber")
  return arr;
}
