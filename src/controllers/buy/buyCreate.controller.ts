import { Request, Response } from "express"
import { ErrorHandler, handleError } from "../../errors/error"
import buyCreateService from "../../services/buy/buyCreate.service"

class buyCreateController {

    async handle(req: Request, res: Response) {

        try {

            const { user_id } = req

            const buyCreate = new buyCreateService()

            const buy = await buyCreate.execute(user_id)

            if (buy) {

                const { user, ...buyDataWithouUser} = buy
                
                return res.status(201).json(buyDataWithouUser)
            }

        } catch (error) {

            if(error instanceof ErrorHandler) {
                handleError(error, res)
            }

        }
    }
}

export default buyCreateController