import { Request, Response } from "express"
import { ErrorHandler, handleError } from "../../errors/error"
import userRecoverPwdService from "../../services/user/userRecoverPwd.service"

class userRecoverPwdController {

    async handle(req: Request, res: Response) {

        const { email } = req.recover_data

        try {

            const userRecoverPwd = new userRecoverPwdService()

            const recover: string = await userRecoverPwd.execute(email)

            res.status(201).json({ message: recover })

        } catch (error) {

            if (error instanceof ErrorHandler) {
                handleError(error, res)
            }
        }
    }
}

export default userRecoverPwdController