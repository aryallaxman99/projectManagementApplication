import mongoose from "mongoose";
import appConfig from "../../config/app-config.json" assert { type: "json" };
const connectionString = appConfig.uri;

const connection = async () => {
  try {
    await mongoose.set("strictQuery", false).connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to mongodb");
  } catch (error) {
    console.error(error);
  }
};

export default connection;
