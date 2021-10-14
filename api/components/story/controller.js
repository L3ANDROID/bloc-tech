import { response } from "../../../network";
import { list, store, findBy, upsert, remove } from "../../../store/dummy";
import storyModel from "./model";

//*POST
export const createStory = async (req, res) => {
    // ?Destructuracion
    const { title, author, text } = req.body;
    const today = new Date();
    let fecha = today.getDate() + '-' + ( today.getMonth() + 1 ) + '-' + today.getFullYear();
    let hora = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    let dateTime = `${fecha} - ${hora}`;

    if (!title || !author || !text) {
        res.status(400).send("you must complete all entries.");
        return;
    }

    let newStory = {
        title,
        author,
        text,
        dateTime
    }
    await store(storyModel, newStory)

    return response({
        res,
        data: { title, author, text, dateTime },
    });
};

//GET
export const showStory = async (req, res) => {
    const stories = await list(storyModel)
    return response({
      res,
      data: stories
    });
  };

  export const showOne = async (req, res) => {
    const { id } = req.params;
    const story = await findBy({ value: id, model: storyModel });
    if(!story) return response({res, status:400, data:"story not found"})
    return response({
      res,
      data: story
    });
  };

//UPDATE
export const updateStory = async (req, res) => {
    const { title, author, text } = req.body;
    const { id } = req.params
    if (!title || !author || !text) {
      return response({res, status: 400, data: "you must complete at least one correct entry."});
    }
    const stories = await upsert({ model: storyModel, id, data: req.body });
    if (!stories) {
      return response({
        ok: false,
        status: 500,
        res,
        data: "story not found",
      });
    };
    return response({ res, data: stories });
  }

  //DELETE
export const deleteStory = async (req, res) => {
    const { id } = req.params;

    const stories = await remove(storyModel, id);

    if (!stories) {
      return response({
        res,
        status: 500,
        ok: false,
        data: { error: "process failed, story not found" },
      });
    }

    return response({ res, data: stories });
  };