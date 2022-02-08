import { Request, Response } from "express"
import { ErrorHandler, handleError } from "../../errors/error"
import userChangePwdService from "../../services/user/userChangePwd.service"

class userChangePwdController {

    async handle(req: Request, res: Response) {

        const { token, new_password } = req.change_pwd_data

        try {

            const userChangePwd = new userChangePwdService()

            const changed = await userChangePwd.execute(token, new_password)

            res.json({ message: changed })

        } catch (error) {

            if (error instanceof ErrorHandler) {
                handleError(error, res)
            }
        }
    }
}

export default userChangePwdController