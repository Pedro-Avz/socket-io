const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');

// criar app Express e servidor http
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// middleware para processar requests json
app.use(bodyParser.json());

// armazenar clientes conectados
let connectedClients = [];

// conectar clientes via websocket
io.on('connection', (socket) => {
  console.log('Novo cliente conectado', socket.id);
  connectedClients.push(socket);

  socket.on('disconnect', () => {
    console.log('Cliente desconectado', socket.id);
    connectedClients = connectedClients.filter((client) => client.id !== socket.id);
  });
});

// rota webhook que vai ser chamada por serviços externos nesse endpoint -  quando o servidor receber o evento ele envia para todos os clientes conectados via websocket
app.post('/webhook', (req, res) => {
    console.log('Recebido evento de webhook:', req.body);
  
    connectedClients.forEach((client) => {
      client.emit('webhook-event', req.body);
    });
    res.status(200).json({
      message: 'sucesso ao enviar evento',
      data: req.body
    });
});
  

// rota pro html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
