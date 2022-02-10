import { Request, Response } from "express"
import { ErrorHandler, handleError } from "../../errors/error"
import { IBuy } from "../../interfaces/buy/buy.interface"
import buyCreateService from "../../services/buy/buyCreate.service"

class buyCreateController {

    async handle(req: Request, res: Response) {

        try {

            const { user_id } = req

            const buyCreate = new buyCreateService()

            const buy: IBuy | undefined = await buyCreate.execute(user_id)

            if (buy) {

                const { user, ...buyDataWithoutUser } = buy
                
                return res.status(201).json(buyDataWithoutUser)
            }

        } catch (error) {

            if(error instanceof ErrorHandler) {
                handleError(error, res)
            }

        }
    }
}

export default buyCreateController