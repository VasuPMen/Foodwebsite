import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"


const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${url}/api/user/login`, { email, password });
        if (response.data.success) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.user._id);
        }
    } catch (error) {
        console.error("Login Error:", error.response?.data || error.message);
    }
};




const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

const registerUser = async (req, res) => {
    try {
        console.log("Received data:", req.body); // ✅ Debug: Check req.body

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({
            success: true,
            message: "User registered successfully",
            token,
            user: { _id: newUser._id, name, email },
        });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};





export {loginUser , registerUser}