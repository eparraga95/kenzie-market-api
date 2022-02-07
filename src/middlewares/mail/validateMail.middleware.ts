import { Request, Response, NextFunction } from "express"
import { IMailInput } from "../../interfaces/mail/mail.interface"
import { SchemaOf } from "yup"

declare global {
    namespace Express {
        interface Request {
            mail_data: IMailInput
        }
    }
}

export const validateNewEmail = (schema: SchemaOf<IMailInput>) => async (req: Request, res: Response, next: NextFunction) => { 

    try {

        const data = req.body

        try {

            const validatedData = await schema.validate(data, { abortEarly: false, stripUnknown: true})

            req.mail_data = validatedData

            next()
            
        } catch (err: any) {

            // yup error handling
            return res.status(400).json({
                error: err.errors?.join(', ')
            })
        }

    } catch (error) {

        next(error)
    }

}