import { Request, Response, NextFunction} from 'express'
import { ErrorHandler } from '../../errors/error'
import jwt from "jsonwebtoken";
import { config } from '../../config/jwt.config'

declare global {
    namespace Express {
      interface Request {
        user_id: string,
      }
    }
}

export const userAuth = (req: Request, res: Response, next: NextFunction) => {

    try {

        const { id } = req.params

        const headerAuth = req.headers.authorization

        if (!headerAuth) {
            throw new ErrorHandler(401, "Missing authorization headers")
        }

        const token = req.headers.authorization?.split(' ')[1] || ""

        jwt.verify(token, config.secret, (err: any, decoded: any) => {

            if (err) {
                throw new ErrorHandler(401, "Invalid token")
            }

            if (id === decoded.id || decoded.isAdm) {

                req.user_id = decoded.id

                next()

            } else {

                throw new ErrorHandler(401, "Non-admin users can only access their own data")
            }
        })

    } catch (error) {

        next(error)
    }
}