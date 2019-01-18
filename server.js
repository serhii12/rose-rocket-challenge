const express = require('express');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
const logger = require('morgan');
const routes = require('./routes/index');
const app = express();
const PORT = 5000;

const SocketServer = WebSocket.Server;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use('/', routes);

const server = app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}`)
);

const wss = new SocketServer({ server });

wss.broadcast = (data, ws) => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN && client !== ws) {
      client.send(JSON.stringify(data))
    }
  });
};

wss.on('connection', ws => {
  console.log('Client connected');
  // ws.on('message', handleMessage);
  ws.on('close', () => {
    console.log('Client disconnected');
    // wss.broadcast(userDisconnected);
  });
});
