import { response } from "../../../network";
import { list, store } from "../../../store/dummy";
import commentModel from "./model";

//esta funcion es unicamente para funcionar con postman por el response()
export const getComments = async (req, res) => {
    const comments = await list(commentModel);
    response({ res, data: comments });
};
//esta funcion es unicamente para funcionar con el socket
export const getCommentsBySocket = async () => {
    const comments = await list(commentModel);
    return comments;
};
  
export const saveComments = async (body) => {
 //? Ya no agregamos id porque mongodb lo crea por defecto
  await store(commentModel, body);
  return body;
};