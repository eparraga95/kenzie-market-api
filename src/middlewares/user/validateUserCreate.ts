import { Request, Response, NextFunction} from 'express'
import { IUserCreate } from '../../interfaces/user/user.interface'
import { SchemaOf } from 'yup'

declare global {
    namespace Express {
      interface Request {
        new_user: IUserCreate
      }
    }
}

export const validateNewUser = (schema: SchemaOf<IUserCreate>) => async (req: Request, res: Response, next: NextFunction) => {
   
    try {

        const data = req.body

        try {

            const validatedData = await schema.validate(data, { abortEarly: false, stripUnknown: true})

            req.new_user = validatedData
            
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