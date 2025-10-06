import mongoose from "mongoose";
import express from "express";
import { register, login, logout } from "../controller/userController.js";

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.get("/logout", logout);

export default router;