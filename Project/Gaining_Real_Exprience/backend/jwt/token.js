import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import { httpUrl } from "zod";
const generateTokenAndSaveInCookies = async (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: "10days"
    });
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/"

    })

    await User.findByIdAndUpdate(userId, { token });
    return token;
}

export default generateTokenAndSaveInCookies;