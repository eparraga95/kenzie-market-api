import "reflect-metadata";
import { createConnection } from "typeorm"
import app from "./app"
import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.SERVER_PORT || 3000

createConnection().then( () => {

    console.log("Database connected!");

    app.listen(PORT, () => {
        console.log("Server running!");
    })

}).catch(error => console.log(error));