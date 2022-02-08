import { ConnectionOptions } from "typeorm";
import { User, Cart, Product, Buy, ResetToken } from "../entities";
import dotenv from 'dotenv'

dotenv.config()

const config: ConnectionOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Cart, Product, Buy, ResetToken],
    synchronize: true,
    logging: false
}

export default config