import { Request, Response } from "express"
import { IBuy } from "../../interfaces/buy/buy.interface"
import buyListService from "../../services/buy/buyList.service"

class buyListController {

    async handle(req: Request, res: Response) {

        const buyList = new buyListService()

        const buys: IBuy[] = await buyList.execute()

        return res.json(buys)

    }
}

export default buyListController