import { Request, Response } from "express"
import { ErrorHandler, handleError } from "../../errors/error"
import sendMailService from "../../services/mail/sendMail.service"

class sendMailController {

    async handle(req: Request, res: Response) {

        const { user_id, message, subject } = req.mail_data

        const { admin_id } = req

        const mailService = new sendMailService()

        try {
            
            const mailResponse = await mailService.execute({ user_id, message, subject}, admin_id)

            res.json(mailResponse)

        } catch (error) {

            if (error instanceof ErrorHandler) {
                handleError(error, res)
            }
        }
    }
}

export default sendMailController