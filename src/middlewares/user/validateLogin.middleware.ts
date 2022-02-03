import { Request, Response, NextFunction} from 'express'
import { IUserLogin } from '../../interfaces/user/user.interface'
import { SchemaOf } from 'yup'

declare global {
    namespace Express {
      interface Request {
        login_data: IUserLogin
      }
    }
}

export const validateLogin = (schema: SchemaOf<IUserLogin>) => async (req: Request, res: Response, next: NextFunction) => {
    try {

        const data = req.body

        try {

            const validatedData = await schema.validate(data, { abortEarly: false, stripUnknown: true})

            req.login_data = validatedData
            
            next()

        } catch (err: any) {

            // yup error handling
            return res.status(400).json({
                error: err.errors?.join(', ')
            })
        }

    } catch (err) {

        next(err)
    }
}