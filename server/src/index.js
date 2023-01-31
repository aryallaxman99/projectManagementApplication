import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import connect from "./db/connect.js";
import userRouter from "./routes/userRouter.js";

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/user", userRouter);

app.listen(process.env.PORT, (err) => {
  if (!err) {
    console.log(`server started at ${process.env.PORT}`);
    connect();
  } else {
    console.error(err);
  }
});
