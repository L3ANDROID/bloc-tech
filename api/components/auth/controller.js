import { v4 as uuidv4 } from 'uuid';
import { sign } from "../../auth";
const fs = require('fs');
import { response } from "../../../network";

//remember, your json file must have [] to read correctly
const json_users = fs.readFileSync('api/users.json', 'utf-8');
let users = JSON.parse(json_users);

//*POST
export const login = (req, res) => {
    // ?Destructuracion
    const user = req.body;
    //este payload se envia a sign para que se cree el token
    const payload = {
      email: user.email,
      password: user.password
    }
    const token = sign(payload)
    return response({
      res,
      data: { user, token },
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
      data: users,
    });
  };