import "reflect-metadata";
import {createConnection} from "typeorm";
import express from "express";

import {User} from "./entity/User";
import { registerUserRouter } from "./Routes/register";
import { loginUserRouter } from "./Routes/login";
import { postRouter } from "./Routes/post";

const app = express();
const port = 4000;

//MIDDLEWARES
app.use(express.json())
app.use(registerUserRouter)
app.use(loginUserRouter)
app.use(postRouter)

const main = async () => {
    try {
        await createConnection ({
            "type": "postgres",
            "host": "localhost",
            "port": 5432,
            "username": "postgres",
            "password": "Television19",
            "database": "oauth_db",
            "synchronize": true,
            "entities": [
                "src/entity/**/*.ts"
             ]
        })

        console.log("Connected to database")
        app.listen(port, () => {
            console.log(`Server up and running on port: ${port}`)
        })
        
    }catch(error){
        console.log(error);
        console.log("Unable to connect")
    }
}

main()