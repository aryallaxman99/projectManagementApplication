import { Router } from "express";
import Users from "../models/usersModel.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const data = await Users.create(req.body);
    if (data) {
      res.json({
        msg: "registerd sucessfully",
      });
    } else {
      res.json({
        msg: "error on registration",
      });
    }
  } catch (error) {
    console.error(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
  } catch (error) {
    console.error(error);
  }
});

router.get("/get", async (req, res) => {
  const data = await Users.find();
  res.send(data);
});

export default router;
