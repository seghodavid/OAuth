import express from "express";
import { User } from "../entity/User"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

import { registerUserRouter } from "./register";

const bcrypt = require("bcrypt");
const router = express.Router();
router.post('/api/users/login', async (req, res) => {
    try{
        const { email } = req.body
     const client = await User.findOne({where: {email: email}})
     if(!client) return res.json("User not found") 



//CHECKING IF USER PASSWORD MATCHES INPUTED PASSWORD
     const validpass = await bcrypt.compare(req.body.password, client.password)
     if(!validpass) return res.json("Something went wrong")

    //CREATE AND ASSIGN TOKEN
    const token = jwt.sign({id: client.id}, process.env.TOKEN_SECRET);
    return res.header('auth-token', token).send(token)
        
    
    }  catch(err){
        res.status(400).json(err)
    }
})
export {
    router as loginUserRouter
}