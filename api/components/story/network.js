import express from "express";
import { createStory, showOne, showStory, deleteStory, updateStory } from "./controller";

const storyRouter = express.Router();

storyRouter.route("/show/:id").get(showOne);
storyRouter.route("/create").post(createStory);
storyRouter.route("/read").get(showStory);
storyRouter.route("/update/:id").put(updateStory);
storyRouter.route("/delete/:id").delete(deleteStory);

//? Usamos export default cuando solamente hay una cosa que exportar
export default storyRouter;