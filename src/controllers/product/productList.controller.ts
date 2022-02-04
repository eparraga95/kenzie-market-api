import { Request, Response} from "express"
import { IProduct } from "../../interfaces/product/product.interface"
import productListService from "../../services/product/productList.service"

class productListController {

    async handle(req: Request, res: Response) {

        const productList = new productListService()

        const products: IProduct[] = await productList.execute()

        return res.json(products)

    }
}

export default productListController