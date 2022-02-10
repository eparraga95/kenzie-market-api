import { Request, Response } from "express"
import { ErrorHandler, handleError } from "../../errors/error"
import { ICart } from "../../interfaces/cart/cart.interface"
import cartByUserIdService from "../../services/cart/cartByUserId.service"

class cartByUserIdController {

    async handle(req: Request, res: Response) {

        const user_id = req.user_id

        const cartByUserId = new cartByUserIdService()

        try {

            const user_cart: ICart | undefined = await cartByUserId.execute(user_id)

            return res.json(user_cart)
        
        } catch (error) {

            if (error instanceof ErrorHandler) {
                handleError(error, res)
            }
        }
    }
}

export default cartByUserIdController