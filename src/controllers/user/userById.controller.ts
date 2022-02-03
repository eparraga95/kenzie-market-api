import { Request, Response } from "express"
import { ErrorHandler, handleError } from "../../errors/error"
import { ISafeUser } from "../../interfaces/user/user.interface"
import userByIdService from "../../services/user/userById.service"

class userByIdController {

    async handle(req: Request, res: Response) {

        const id = req.user_id

        const userById = new userByIdService()

        try {

            const userData: ISafeUser = await userById.execute(id)

            delete userData.password

            return res.json(userData)

        } catch (error) {

            if (error instanceof ErrorHandler) {
                handleError(error, res)
            }
        }
    }
}

export default userByIdController