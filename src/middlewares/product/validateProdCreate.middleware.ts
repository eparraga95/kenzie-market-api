import { Request, Response, NextFunction } from "express"
import { IProductCreate } from "../../interfaces/product/product.interface"
import { SchemaOf } from "yup"

declare global {
    namespace Express {
        interface Request {
            new_product: IProductCreate
        }
    }
}

export const validateNewProduct = (schema: SchemaOf<IProductCreate>) => async (req: Request, res: Response, next: NextFunction) => { 

    try {

        const data = req.body

        try {

            const validatedData = await schema.validate(data, { abortEarly: false, stripUnknown: true})

            req.new_product = validatedData

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