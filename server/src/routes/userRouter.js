import { Router } from "express";
import bcrypt from "bcrypt";
import Users from "../models/usersModel.js";

const router = Router();
const saltRounds = 10;

router.post("/register", async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const email = await Users.findOne({ email: req.body.email }).exec();
    if (hash) {
      req.body.password = hash;
      if (email == null) {
        const data = await Users.create(req.body);
        if (data) {
          res.json({ msg: "users registered" });
        } else {
          res.json({ msg: "something went wrong" });
        }
      } else {
        res.json({ msg: "email already exist please enter another email" });
      }
    }
  } catch (err) {
    console.log(err);
  }
  next();
});

router.post("/login", async (req, res) => {
  try {
    const data = await Users.findOne({ email: req.body.email });

    if (data) {
      const dbPassword = data.password;
      const isValidPassword = bcrypt.compareSync(req.body.password, dbPassword);
      const { password, _id, __v, ...refactoredData } = data.toObject();
      if (isValidPassword) {
        res.json({
          msg: "login success",
          userDetails: refactoredData,
        });
      } else {
        res.json({
          msg: "password did not match",
        });
      }
    } else {
      res.json({
        msg: "invalid credentials",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/get", async (req, res) => {
  const data = await Users.find();
  res.send(data);
});

export default router;
