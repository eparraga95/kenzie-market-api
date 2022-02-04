import { Request, Response } from "express"
import { ErrorHandler, handleError } from "../../errors/error"
import productCreateService from "../../services/product/productCreate.service"

class productCreateController {

    async handle(req: Request, res: Response) {

        try {

            const data = req.new_product

            const productCreate = new productCreateService()

            const product = await productCreate.execute(data)

            return res.status(201).json(product)

        } catch (error) {

            if (error instanceof ErrorHandler) {
                handleError(error, res)
            }
        }
    }
}

export default productCreateController