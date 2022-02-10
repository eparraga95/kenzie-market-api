import { ErrorHandler, handleError } from "../../errors/error";
import { Request, Response } from "express"
import userLoginService from "../../services/user/userLogin.service"

class userLoginController {

    async handle(req: Request, res: Response) {

        try {

            const { email, password } = req.login_data

            const userLogin = new userLoginService()

            const token: string = await userLogin.execute({ email, password })

            return res.status(200).json({token: token})

        } catch (error) {

            if (error instanceof ErrorHandler) {
                handleError(error, res)
            }
        }
    }
}

export default userLoginController