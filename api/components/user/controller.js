/**
 * * Login => Email, Password => POST
 * * SignUp => Name, Lastname, Email, Password => POST
 * * ShowUser => ID => Show => GET
 * * Reset password => Email => POST
 * * Update User => Id, UserData => PUT
 * * Delete user => Id => DELETE
 */
 import { v4 as uuidv4 } from 'uuid';
import { response } from "../../../network";
const fs = require('fs');

//remember, your json file must have [] to read correctly
const json_users = fs.readFileSync('api/users.json', 'utf-8');
let users = JSON.parse(json_users);

//*POST
export const login = (req, res) => {
  // ?Destructuracion
  const { email, password } = req.body;
  console.log(req.body)
  return response({
    res,
    data: { email, password },
  });
};

export const signUp = (req, res) => {
  const { name, last_name, email, password } = req.body;

  if (!name || !last_name || !email || !password) {
    res.status(400).send("you must complete all entries.");
    return;
  }

  let newUser = {
    id: uuidv4(),
    name,
    last_name,
    email,
    password
  }
  // add a new user to the array
  users.push(newUser);
  // saving the array in a file
  const new_json_users = JSON.stringify(users);
  fs.writeFileSync('api/users.json', new_json_users, 'utf-8');

  return response({
    res,
    data: { name, last_name, email, password },
  });
};
//GET
export const showUsers = (req, res) => {
  return response({
    res,
    data: users
  });
};

//UPDATE
export const updateUser = async (req, res) => {
  const { name, last_name, email, password } = req.body;
  if (!name || !last_name || !email || !password) {
    res.status(400).send("you must complete at least one correct entry.");
    return;
  }
  const userIndex = await users.findIndex(user => user.id === req.params.id);
  if (userIndex<0){
    return res.status(401).send("user not found")
  }
  const updatedUser = { ...users[userIndex], ...req.body};
  const updatedUsers = [
    ...users.slice(0, userIndex),
    updatedUser,
    ...users.slice(userIndex + 1),
  ];
  const json_users = JSON.stringify(updatedUsers);
  fs.writeFileSync('api/users.json', json_users, 'utf-8');
  return response({
    res,
    ok: "User updated correctly.",
    data: updatedUser,
  });
}

//DELETE
export const deleteUser = async (req, res) => {
  console.log(req.params.id)
  const userIndex = await users.findIndex(user => user.id === req.params.id);
  if (userIndex<0){
    return res.status(401).send("process failed, user not found")
  }
  users = users.filter(user => user.id != req.params.id);

  // saving data
  const json_users = JSON.stringify(users);
  fs.writeFileSync('api/users.json', json_users, 'utf-8');
  res.status(200).send("User has been deleted");
};
