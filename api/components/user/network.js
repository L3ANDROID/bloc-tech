import express from "express";
import { login, signUp, showUsers, deleteUser, updateUser, showOne } from "./controller";

const userRouter = express.Router();

//-------------------------Rutas no protegidas------------------------------------
//en estas rutas se genera el token por eso no van aqui, sino en authRouter
// userRouter.route("/login").post(login);
// userRouter.route("/signup").post(signUp);
//-------------------------Rutas protegidas--------------------------------
//en estas rutas se recibe el token
userRouter.route("/show/:id").get(showOne);
userRouter.route("/users").get(showUsers);
userRouter.route("/update/:id").put(updateUser);
userRouter.route("/delete/:id").delete(deleteUser);

//? Usamos export default cuando solamente hay una cosa que exportar
export default userRouter;
