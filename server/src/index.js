import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("home");
});

app.listen(5000, (err) => {
  if (!err) {
    console.log(`server started`);
  } else {
    console.error(err);
  }
});
