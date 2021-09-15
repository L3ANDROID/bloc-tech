import { v4 as uuidv4 } from 'uuid';
// import { sign } from "../../auth";
const fs = require('fs');
import { response } from "../../../network";

const json_comments = fs.readFileSync('api/comments.json', 'utf-8');
export let comments = JSON.parse(json_comments);

export const getComments = (req, res) => {
    response({ res, data: comments });
  };
  
export const saveComments = (body) => {
    //? Tengo que modificar para agregarle un ID
    body.id = uuidv4();

    // add a new comment to the array
    comments.push(body);
    // saving the array in a file
    const new_json_comments = JSON.stringify(comments);
    fs.writeFileSync('api/comments.json', new_json_comments, 'utf-8');

    return {
        ok: true,
        message: body,
    };
};