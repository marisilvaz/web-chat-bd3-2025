const express = require("express");
const ejs = require("ejs");
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, "public"))); //__dirname é tudo que está atras da raiz do projeto

app.set("views", path.join(__dirname, "public"));

app.engine("html", ejs.renderFile);

app.use("/", (req, res) => {
  res.rernder("index.html");
});

server.listen(3000, () => {
  console.log("SERVIDOR RODANDO EM - http://localhost:3000");
});

let messagens = [];

io.on('connection', socket =>{
  console.log('ID de usuário conectado: ' + socket.id);
  socket.emit('previousMessage', messagens);
  socket.on('sendMessage', data =>{
    messagens.push(data); //estilo de fila
    socket.broadcast.emit('receiveddMessage', data);
  });
}); //ligar


