import { Router } from "express";
const router = Router();
import userController from "../controllers/userController.js"

router.post("/register",userController.registerUser);
router.post("/login",userController.userLogin);
router.post("/forgotpassword",userController.ifUserForgotPassword);
router.post("/otpvalidator",userController.otpChecker);
router.put("/resetpassword",userController.resetpassword);

export default router;
