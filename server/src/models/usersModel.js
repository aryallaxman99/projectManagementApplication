import mongoose from "mongoose";
import { Schema } from "mongoose";

const usersSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    country: { type: String, required: true },
    userRole: { type: String, required: true },
  },
  { collection: "users" }
);

const usersModel = mongoose.model("Users", usersSchema);

export default usersModel;
