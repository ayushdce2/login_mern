const UserModel = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(name, email, password,"signup COntroller");
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'Email already exists' });
        }
        const user = new UserModel({ name, email, password });
        user.password = await bcrypt.hash(password, 10);
        await user.save();
        res.status(201).json({ user, success: true, message: "Signup Success" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', success: false });
    }
}

const login = async (req, res) => {
    try {
        const {  email, password } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (!existingUser) {
            return res.status(403).json({ message: 'User Not Found', success: false });
        }
        
        const isPassEqual = await bcrypt.compare(password,existingUser.password);
        if(!isPassEqual){
            return res.status(403).json({ message: 'Invalid Password', success: false });
        }
        const jwtToken = jwt.sign(
            
                {email:existingUser.email, _id:existingUser._id},
                process.env.JWT_Secret,
                {expiresIn:"24h"}
            
        )
        res.status(200).json({ existingUser, success: true, message: "LOGIN Success",jwtToken,email, name: existingUser.name });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', success: false });
    }
}

module.exports = {signup,login};


