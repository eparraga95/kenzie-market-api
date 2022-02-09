import express, { Request, Response, NextFunction } from "express"
import { ErrorHandler, handleError } from "./errors/error"
import router from "./routes"
import swaggerUiExpress from "swagger-ui-express"
import swaggerDocument from "../swagger.json"

const app = express()

app.use(express.json())
app.use(router)
app.use(
    "/api-documentation",
    swaggerUiExpress.serve,
    swaggerUiExpress.setup(swaggerDocument)
)
app.use((err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    handleError(err, res)
})

export default app
