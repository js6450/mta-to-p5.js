let socket = io();

function setup(){
    socket.emit('requestData', 237)
    socket.on('data', getData);
}

function getData(data){
    console.log(data);
}