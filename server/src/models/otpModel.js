import mongoose from "mongoose";
import { Schema } from "mongoose";

const otpSchema = new Schema(
  {
    email: { type: String, required: true },
    code: { type: String, required: true },
  },
  { collection: "otps" }
);

const otpModel = mongoose.model("Otps", otpSchema);

export default otpModel;
