import { Request, Response } from "express"
import cartListService from "../../services/cart/cartList.service"

class cartListController {

    async handle(req: Request, res: Response) {

        const cartList = new cartListService ()

        const carts = await cartList.execute()

        return res.json(carts)
    }
}

export default cartListController