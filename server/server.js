const app = require('./app');
app.set('port', process.env.PORT || 5000);

const WebSocket = require('ws');
const SocketServer = WebSocket.Server;

const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

const wss = new SocketServer({ server });
app.set('wss',wss);

wss.broadcast = (data, ws) => {
  wss.clients.forEach(client => {
    // client !== ws
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data))
    }
  });
};


wss.on('connection', ws => {
  console.log('Client connected');
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
