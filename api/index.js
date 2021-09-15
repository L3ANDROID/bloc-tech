import express from "express";
import authRouter from "./components/auth";
import userRouter from "./components/user";
import storyRouter from "./components/story";
import commentRouter from "./components/comment";
import { base_url,port } from "./config/config";
import { checkToken } from "./auth";
import { Server as WebSocketServer } from 'socket.io';
import http from "http";

import { comments ,saveComments } from "./components/comment/controller";

const app = express();
//implementando socket.io
const server = http.createServer(app);
const io = new WebSocketServer(server);

//cargando la carpeta public
app.use(express.static(__dirname+"/public"))

//connection es la palabra reservda la cual se encarga de encender la conexion entre cliente/servidor
//el servidor empieza a escuchar los eventos del cliente
io.on("connection", (socket) => {
    console.log("new connection")

    socket.on("init:page", () => {
        socket.emit("init:comments", comments)
      });

  //? Evento para guardar comentarios para
  // * Recibe el comentario desde el cliente y ademas lo guarda
  socket.on("new:comment", (body) => {
    const res = saveComments(body);
    //* Una vez que se guardo el comentario le response al cliente que todo ok
    socket.emit("save:comment", res);
  });
})

//? Esto sirve para poder leer el body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`${base_url}/auth`, authRouter);
app.use(`${base_url}/user`, checkToken, userRouter);
app.use(`${base_url}/story`, storyRouter);
app.use(`${base_url}/comment`, commentRouter);

server.listen(port, () => console.log(`listening on port http://localhost:${port}`));
