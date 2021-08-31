import express from "express";
import { login, signUp, showUsers, deleteUser, updateUser } from "./controller";

const userRouter = express.Router();

userRouter.route("/login").post(login);
userRouter.route("/signup").post(signUp);
userRouter.route("/users").get(showUsers);
userRouter.route("/update/:id").put(updateUser);
userRouter.route("/delete/:id").delete(deleteUser);

//? Usamos export default cuando solamente hay una cosa que exportar
export default userRouter;
