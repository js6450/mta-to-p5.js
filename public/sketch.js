let socket = io();

let nextTrain;
let nextTrainTime;

let lineOne;

function setup(){
    socket.emit('requestData', 636);
    socket.on('data', getData);
}

function getData(data){
    console.log(data);

    lineOne = data.lines[0];

    nextTrain = data.lines[0].departures.S[0];
    nextTrainTime = new Date(nextTrain.time * 1000);

    let currentTime = new Date();

    console.log(nextTrainTime);

    console.log(nextTrainTime.getHours());
    console.log(nextTrainTime.getMinutes());
}