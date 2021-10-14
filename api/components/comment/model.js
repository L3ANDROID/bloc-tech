// comment
// author => user_id
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    require: true,
  }
});

const commentModel = mongoose.model("comments", commentSchema);

export default commentModel;