import { Request, Response } from "express"
import { ErrorHandler, handleError } from "../../errors/error"
import { IProduct } from "../../interfaces/product/product.interface"
import productByIdService from "../../services/product/productById.service"

class productByIdController {

    async handle(req: Request, res: Response) {

        const { product_id } = req.params

        const productById = new productByIdService()

        try {

            const product: IProduct = await productById.execute(product_id)

            return res.json(product)

        } catch (error) {

            if (error instanceof ErrorHandler) {
                handleError(error, res)
            }
        }
    }
}

export default productByIdController