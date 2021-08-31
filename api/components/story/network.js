import express from "express";
import { createStory, showStory, deleteStory, updateStory } from "./controller";

const storyRouter = express.Router();

storyRouter.route("/create").post(createStory);
storyRouter.route("/read").get(showStory);
storyRouter.route("/updatestory/:id").put(updateStory);
storyRouter.route("/deletestory/:id").delete(deleteStory);

//? Usamos export default cuando solamente hay una cosa que exportar
export default storyRouter;