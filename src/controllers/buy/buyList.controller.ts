import { Request, Response } from "express"
import buyListService from "../../services/buy/buyList.service"

class buyListController {

    async handle(req: Request, res: Response) {

        const buyList = new buyListService()

        const buys = await buyList.execute()

        return res.json(buys)

    }
}

export default buyListController