import { Request, Response } from "express"
import { ErrorHandler, handleError } from "../../errors/error"
import buyByIdService from "../../services/buy/buyById.service"
import { IBuy } from "../../interfaces/buy/buy.interface"

class buyByIdController {

    async handle(req: Request, res: Response) {

        const { buy_id } = req.params

        const buyById = new buyByIdService()

        try {

            const buy: IBuy = await buyById.execute(buy_id)

            return res.json(buy)

        } catch (error) {

            if (error instanceof ErrorHandler) {
                handleError(error, res)
            }
        }
    }
}

export default buyByIdController