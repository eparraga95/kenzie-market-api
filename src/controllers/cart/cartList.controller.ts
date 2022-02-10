import { Request, Response } from "express"
import { ICart } from "../../interfaces/cart/cart.interface"
import cartListService from "../../services/cart/cartList.service"

class cartListController {

    async handle(req: Request, res: Response) {

        const cartList = new cartListService ()

        const carts: ICart[] = await cartList.execute()

        return res.json(carts)
    }
}

export default cartListController