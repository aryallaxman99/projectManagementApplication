import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import connect from "./db/connect.js";
import userRouter from "./routes/userRouter.js";
const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("home");
});

app.use("/user", userRouter);

app.listen(port, (err) => {
  if (!err) {
    console.log(`server started at ${port}`);
    connect();
  } else {
    console.error(err);
  }
});
