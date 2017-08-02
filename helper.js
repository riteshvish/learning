
var shiftLeft=function(array,interation){
  console.log("\nshiftLeft shift");
  var  counter=0
  for (var i = 0; i < interation; i++) {
    for (var j = array.length-1; j>0 ; j--) {
        array[j-1]=array[j-1]+array[j]
        array[j]=array[j-1]-array[j]
        array[j-1]=array[j-1]-array[j]
        counter++;
    }
  }
    console.log(counter);
    console.log(array)
}

var shiftRight=function(array,interation){
  console.log("\nshiftRight shift");
  var  counter=0
  for (var i = 0; i < array.length-interation; i++) {
    for (var j = 0; j < array.length-1; j++) {
        array[j+1]=array[j+1]+array[j]
        array[j]=array[j+1]-array[j]
        array[j+1]=array[j+1]-array[j]
        counter++;
    }
  }
    console.log(counter);
    console.log(array)
}

var shiftRightADV=function(array,interation){
  console.log("\nshiftRightADV shift");
  var  counter=0
  if(interation<array.length/2){
    for (var j = 0; j < array.length-interation; j++) {
        var swapi=(array.length-interation+j)%array.length;

        console.log(swapi)
        array[swapi]=array[swapi]+array[j]
        array[j]=array[swapi]-array[j]
        array[swapi]=array[swapi]-array[j]
        counter++;
    }
  }
  else{
    console.warn("this algo will not work");
  }
    console.log(counter)
    console.log(array)
}
var arraymain=[1,2,3,4,5,6,7,8,9,10];
var interation=28;


shiftLeft([1,2,3,4,5,6,7,8,9,10],interation);
shiftRight([1,2,3,4,5,6,7,8,9,10],interation);
shiftRightADV([1,2,3,4,5,6,7,8,9,10],interation);
