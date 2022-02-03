import "reflect-metadata";
import { createConnection } from "typeorm"
import app from "./app"
import config from "./database"
import dotenv from "dotenv"

dotenv.config()

const port = process.env.SERVER_PORT

createConnection(config)
    .then(() => {
        console.log("Database connected!")
    
        app.listen(port, () => {
            console.log("Server running!")
        })
    })
    .catch((error) => console.log(error))

