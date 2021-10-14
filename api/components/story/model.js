// este modelo sera el del usuario el cual contenga la estructura de datos
// paso 1 importar mongoose
import mongoose from "mongoose";
// paso 2 definir los datos
// Entendemos el usuario tiene
/**
 * id, name, last_name, email. password
 */
//* ojo por default mongo le pone un _id ******
const userSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  dateTime: {
    type: String,
    required: true,
  },
});

const storyModel = mongoose.model("stories", userSchema);

export default storyModel;