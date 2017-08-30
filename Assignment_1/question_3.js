function forEach(arr, callback){
    for(var i=0; i<arr.length; i++){
        callback(arr[i]);
    }
}

function map(arr, callback){
    var newArr = [];
    for(var i=0; i<arr.length; i++){
        newArr.push(callback(arr[i]));
    }
    return newArr;
}
function sqaure(n){
    return n*n;
}
var arr = [1,2,3];
forEach(arr, console.log);
console.log(map(arr, sqaure));