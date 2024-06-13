import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/Users.js';

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (user) {
        return res.json({ message: "User Already Exists!" });
    }
    // creating new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();
    res.json({ message: "User registered successfully!" });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) {
        return res.json({ message: "User does not exist!" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.json({ message: "Invalid Password!" });
    }
    const token = jwt.sign({ id: user._id }, "secret");
    res.json({ token, userID: user._id, message: "User logged in successfully!" });
});


export { router as userRouter }

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.json({ message: "Access Denied!" });
    }
    try {
        const user = jwt.verify(token, "secret");
        req.user = user;
        next();
    } catch (error) {
        res.json({ message: "Invalid Token!" });
    }
}   // Path: server/src/routes/users.js