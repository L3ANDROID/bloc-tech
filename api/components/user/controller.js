/**
 * * Login => Email, Password => POST
 * * SignUp => Name, Lastname, Email, Password => POST
 * * ShowUser => ID => Show => GET
 * * Reset password => Email => POST
 * * Update User => Id, UserData => PUT
 * * Delete user => Id => DELETE
 */
import { response } from "../../../network";
import { list, findBy, upsert, remove } from "../../../store/dummy";
const fs = require('fs');
// paso 1 importar el modelo
import userModel from "./model";

//remember, your json file must have [] to read correctly
const json_users = fs.readFileSync('api/users.json', 'utf-8');
let users = JSON.parse(json_users);

//GET
export const showUsers = async (req, res) => response({ res, data: await list(userModel), status: 200 });

export const showOne = async (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  // recordemos que find recibe 3 cosas
  // * 1 modelo
  // * 2 key = _id
  // * 3 value
  // ? como puedo hacer para que el orden de los parametros no importe?
  //? deberimoas pasarle un objeto usando destruccion
  const user = await findBy({ value: id, model: userModel });

  if (!user) {
    response({ ok: false, status: 500, res, data: "error data not found" });
  }

  return response({ res, data: user });
};

//UPDATE
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, last_name, email, password } = req.body;
  if (!name || !last_name || !email || !password) {
    return response({res, status: 400, data: "you must complete at least one correct entry."});
  }
  // ademas del id usamos el bomodeldy que contiene los datos a cambiar
  const users = await upsert({ model: userModel, id, data: req.body });
  if (!users) {
    return response({
      ok: false,
      status: 500,
      res,
      data: "user not found",
    });
  };
  return response({ res, data: users });
};

//DELETE
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const users = await remove(userModel, id);

  if (!users) {
    return response({
      res,
      status: 500,
      ok: false,
      data: { error: "process failed, user not found" },
    });
  }

  return response({ res, data: users });
};
