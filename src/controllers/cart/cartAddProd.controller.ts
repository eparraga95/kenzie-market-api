import { Request, Response } from "express";
import { ErrorHandler, handleError } from "../../errors/error";
import cartAddProdService from "../../services/cart/cartAddProd.service";

class cartAddProdController {

    async handle(req: Request, res: Response) {

        const user_id = req.user_id

        const product_data = req.product_data

        const cartAdd = new cartAddProdService()

        try {

            const updatedCart = await cartAdd.execute(product_data, user_id)

            res.json(updatedCart)

        } catch (error) {

            if (error instanceof ErrorHandler) {
                handleError(error, res)
            }
        }

    }
}

export default cartAddProdController