const express = require('express');
const app = express();

app.set('views', __dirname + '/public');
app.engine(".html", require('ejs').__express);
app.set("view engine", "html");
app.use(express.static(__dirname + '/public'));

const { createClient } = require('mta-realtime-subway-departures');
const MTA_API_KEY = '6pT2nxYqZJ4ISbmo7qQyu3ApbHKFgUaa15T1PQiA';
const client = createClient(MTA_API_KEY);

const http = require('http');
const socketHTTP = http.Server(app);

const io = require('socket.io')(socketHTTP);
const port = process.env.PORT || 8000;

socketHTTP.listen(port, () => console.log('listening on port ' + port));

app.get('/', function(req, res){
    res.render("index");
});

io.on('connection', function(socket){
    socket.on('requestData', function(data){
        console.log(data);
        // https://github.com/ericandrewlewis/mta-subway-complexes/blob/master/complexes.json
        client.departures(data)
            .then((response) => {
                socket.emit('data', response);
            });
    })
});

io.on('disconnect', function(socket){
    console.log(socket.id + "disconnected");
});