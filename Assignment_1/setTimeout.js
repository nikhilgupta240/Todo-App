function setTimeout(callback, n){
    var start = new Date();
    while((new Date())-start <n){

    }
    callback("Callback called");
}

setTimeout(console.log, 10000);