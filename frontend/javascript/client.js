const WebSocket = require('ws');

// const serverAddress = "ws://127.0.0.1:5000";
// const serverAddress = 'wss://simple-websocket-server-echo.glitch.me/';
const serverAddress = 'wss://fierce-absorbed-cuckoo.glitch.me/counter';

const ws = new WebSocket(serverAddress, {
    headers: {
        "user-agent": "Mozilla"
    }
});

ws.on('open', function() {
    ws.send("2022");
});

ws.on('message', function(msg) {
    console.log("Received counter from the server: " + msg);
});
