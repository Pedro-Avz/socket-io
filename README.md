# Webhook WebSocket Demo

Este projeto é uma aplicação de estudo de como usar webhooks e WebSocket com Socket.io. A aplicação é construída com Node.js e Express, e utiliza Socket.io para comunicação em tempo real entre o servidor e os clientes.

## Requisitos

Antes de começar, você precisa ter o Node.js e o npm instalados em sua máquina.

### Execute o Servidor

`node server.js`

### Abra seu navegador e vá para http://localhost:3000 para acessar a aplicação. A página deve exibir a interface da aplicação WebSocket.

### Execute o curl no seu terminal 

curl -X POST http://localhost:3000/webhook \
     -H "Content-Type: application/json" \
     -d '{"event": "teste", "data": "Teste de webhook"}'

### Vejá que o client (index.html do seu servidor , "http://localhost:3000"), irá receber o evento!
