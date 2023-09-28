import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,  // Corrected the type declaration
    required: true,
  },
  email: {
    type: String,  // Corrected the type declaration
    required: true,
    unique: true,
  },
  password: {
    type: String,  // Corrected the type declaration
    required: true,
  },
});

export default mongoose.model("User", userSchema);
