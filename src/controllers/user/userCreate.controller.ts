import { Request, Response } from "express"
import { ErrorHandler, handleError } from "../../errors/error"
import { IUser } from "../../interfaces/user/user.interface"
import userCreateService from "../../services/user/userCreate.service"

class userCreateController {

    async handle(req: Request, res: Response) {

        try {

            const data = req.new_user

            const userCreate = new userCreateService()

            const user: IUser = await userCreate.execute(data)

            const { password, ...safeUser } = user

            return res.status(201).json(safeUser)

        } catch (error) {

            if (error instanceof ErrorHandler) {
                handleError(error, res)
            }

        }
    }
}

export default userCreateController