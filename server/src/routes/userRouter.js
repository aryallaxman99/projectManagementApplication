import { response, Router } from "express";
import bcrypt from "bcrypt";
import otpGenerator from "otp-generator";
import Users from "../models/usersModel.js";
import Otp from "../models/otpModel.js";

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
          msg: `The password you’ve entered is incorrect.`,
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

router.all("/forgotpassword", async (req, res, next) => {
  try {
    const isEmailExists = await Users.findOne({ email: req.body.email });

    if (isEmailExists !== null) {
      res.json({ msg: "Email found" });
      const code = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });

      const isOtpAlreadyExists = await Otp.findOne({
        email: req.body.email,
      });

      if (isOtpAlreadyExists == null) {
        const otpData = {
          email: req.body.email,
          code: code,
        };
        await Otp.create(otpData);
      } else {
        isOtpAlreadyExists.code = code;

        const { _id, __v, ...refactoredData } = isOtpAlreadyExists.toObject();

        await Otp.findByIdAndUpdate(isOtpAlreadyExists._id, refactoredData);
      }
    } else {
      res.json({
        msg: "Email not found",
      });
    }
  } catch (error) {
    console.error(error);
  }
  next();
});

router.put("/resetpassword", async (req, res, next) => {
  try {
    const data = await Otp.findOne({ email: req.body.email });

    if (data.code === req.body.code) {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(req.body.newPassword, salt);
      data.password = hash;
      const response = await Users.findByIdAndUpdate({ _id: data._id }, data);
      if (response) {
        res.json({ msg: "password has been changed" });
      } else {
        res.json({ msg: "something went wrong" });
      }
    } else {
      res.json({ msg: "otp dosen't matched" });
    }
  } catch (error) {
    console.error(error);
  }
});

router.get("/get", async (req, res) => {
  const data = await Users.find();
  res.send(data);
});

export default router;
