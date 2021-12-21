
import express from "express"
const verify = require("./verifyToken")

const router = express.Router();

router.get('/api/posts',verify, (req,res) => {
   res.json({
       posts: {
           title: "My new OAuth api",
           description: "Authentication and Authorization api"
       }
   })
    
});

export{
    router as postRouter
}