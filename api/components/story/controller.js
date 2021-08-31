import { v4 as uuidv4 } from 'uuid';
import { response } from "../../../network";
const fs = require('fs');

const json_stories = fs.readFileSync('api/stories.json', 'utf-8');
let stories = JSON.parse(json_stories);

//*POST
export const createStory = (req, res) => {
    // ?Destructuracion
    const { title, author, text } = req.body;
    const today = new Date();
    let fecha = today.getDate() + '-' + ( today.getMonth() + 1 ) + '-' + today.getFullYear();
    let hora = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    let dateTime = fecha + ' ' + hora;

    if (!title || !author || !text) {
        res.status(400).send("you must complete all entries.");
        return;
    }

    let newStory = {
        id: uuidv4(),
        title,
        author,
        text,
        dateTime
    }
    // add a new story to the array
    stories.push(newStory);
    // saving the array in a file
    const new_json_stories = JSON.stringify(stories);
    fs.writeFileSync('api/stories.json', new_json_stories, 'utf-8');

    return response({
        res,
        data: { title, author, text, dateTime },
    });
};

//GET
export const showStory = (req, res) => {
    return response({
      res,
      data: stories
    });
  };

//UPDATE
export const updateStory = async (req, res) => {
    const { title, author, text } = req.body;
    if (!title || !author || !text) {
      res.status(400).send("you must complete at least one correct entry.");
      return;
    }
    const storyIndex = await stories.findIndex(story => story.id === req.params.id);
    if (storyIndex<0){
      return res.status(401).send("story not found")
    }
    const updatedStory = { ...stories[storyIndex], ...req.body};
    const updatedStories = [
      ...stories.slice(0, storyIndex),
      updatedStory,
      ...stories.slice(storyIndex + 1),
    ];
    const json_stories = JSON.stringify(updatedStories);
    fs.writeFileSync('api/stories.json', json_stories, 'utf-8');
    return response({
      res,
      ok: "Story updated correctly.",
      data: updatedStory,
    });
  }

  //DELETE
export const deleteStory = async (req, res) => {
    console.log(req.params.id)
    const storyIndex = await stories.findIndex(story => story.id === req.params.id);
    if (storyIndex<0){
        return response({res, status: 401, ok: "process failed, story not found"})
    //   return res.status(401).send("process failed, story not found")
    }
    stories = stories.filter(story => story.id != req.params.id);
  
    // saving data
    const json_stories = JSON.stringify(stories);
    fs.writeFileSync('api/stories.json', json_stories, 'utf-8');
    res.status(200).send("Story has been deleted");
  };