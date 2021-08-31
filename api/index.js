import express from "express";
import userRouter from "./components/user";
import storyRouter from "./components/story";

const app = express();

//? Esto sirve para poder leer el body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/", userRouter);
app.use("/api/v2/", storyRouter);

app.listen(8080);
