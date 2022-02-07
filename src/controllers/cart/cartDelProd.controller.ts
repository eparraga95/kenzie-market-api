import { Request, Response } from "express"
import { ErrorHandler, handleError } from "../../errors/error"
import cartDelProdService from "../../services/cart/cartDelProd.service"

class cartDelProdController {

    async handle(req: Request, res: Response) {

        const { product_id } = req.params

        const user_id = req.user_id

        try {

            const cartDelProd = new cartDelProdService()

            const deleted = await cartDelProd.execute(user_id, product_id)

            return res.sendStatus(204)

        } catch (error) {

            if (error instanceof ErrorHandler) {
                handleError(error, res)
            }
        }
    }
}

export default cartDelProdController