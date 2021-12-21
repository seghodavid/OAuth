import express from "express";
import bcrypt from "bcrypt";
import { User } from "../entity/User";

const router = express.Router();

router.post('/api/users/register', async (req, res) => {
    const {
        name,
        email,
        phone,
       
    } = req.body;

       // ENCRYPTING THE PASSWORD
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(req.body.password,salt);

    const user = User.create({
        name,
        email,
        phone,
        password:hashedPassword
      
    })
    const savedUser = await user.save()

    return res.json(savedUser)
})


export{ 
    router as registerUserRouter
}