import "reflect-metadata";
import { createConnection } from "typeorm"
import app from "./app"
import dotenv from "dotenv"

dotenv.config()

createConnection().then( () => {

    console.log("Database connected!");

    app.listen(process.env.PORT || 3000, () => {
        console.log("Server running!");
    })

}).catch(error => console.log(error));