import { user } from "../../zod_validators/user.validator.js";
import { validate } from "../../middleware/validate.js";
import bycrypt from "bcryptjs"
import { User } from "../../db.js";
import mongoose from "mongoose";
import express from "express";
import { generatetoken } from "../../hash/jwtAuth.js";

const router = express.Router();

router.post("/signup", validate(user), async function (req, res) {
    try {
        const { username, email, password } = req.body;
        const checkUser = await User.findOne({
            $or: [
                { email },
                { username }]
        });
        if (checkUser) {
            return res.status(400).json({
                message: "user already exists"
            })

        }
        const hashedPassword = await bycrypt.hash(password, 10);

        const signup = await User.create({
            username,
            email,
            password: hashedPassword
        })
        res.status(200).json({
            message: "user created successfully",
            signup
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "internal server error"
        })
    }

})


router.post("/login", async function (req, res) {
    const { username, password } = req.body;
    console.log(username, password);

    const finduser = await User.findOne({ username })
    if (!finduser) {
        return res.status(400).json({
            message: "user does not exist"
        })
    }
    const isMatch = await bycrypt.compare(password, finduser.password);
    if (!isMatch) {
        return res.status(400).json({
            message: "  Wrong password"
        })
    }
    const token = generatetoken(finduser._id.toString());
    res.status(200).json({
        message: "you have logged in successfully in the todo app",
        token

    })


})
export default router;