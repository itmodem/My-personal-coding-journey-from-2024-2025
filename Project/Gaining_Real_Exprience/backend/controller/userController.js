import User from "../model/userModel.js";
import { z } from "zod";
import bcrypt from "bcrypt";
import generateTokenAndSaveInCookies from "../jwt/token.js";
const userSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    username: z.string().min(3, { message: "User atleast 3 character long" }),
    password: z.string().min(6, { message: "Password must six character long" }),
});
export const register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        if (!email || !username || !password) {
            return res.status(400).json({ message: "All filed are required" });
        }

        const validation = userSchema.safeParse({ email, username, password });
        if (!validation.success) {
            // return res.status(500).json({ errors: validation.error.errors });
            const errorMessage = validation.error.errors.map((err) => err.message);
            return res.status(400).json({ error: errorMessage });
        }

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User already register" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, username, password: hashPassword });
        await newUser.save();
        if (newUser) {
            const token = await generateTokenAndSaveInCookies(newUser._id, res)
            res.status(201).json({ message: "✅ User register successfully", newUser, token });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "User registration failed" });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All filed are required" });
        }
        const user = await User.findOne({ email }).select("+password");
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = await generateTokenAndSaveInCookies(user._id, res)
        res.status(201).json({ message: "✅ User logged in successfully", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "❌ Error logging " });
    }
}

export const logout = (req, res) => {

    try {
        res.clearCookie("jwt", {
            paht: "/"
        });
        res.status(200).json({ message: "✅ User logout successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "❌ Error logging out" });
    }
}