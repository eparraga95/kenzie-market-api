import { Request, Response, NextFunction } from "express"
import { IProductCreate } from "../../interfaces/product/product.interface"
import { SchemaOf } from "yup"
import { IProductAdd } from "../../interfaces/cart/cart.interface"

declare global {
    namespace Express {
        interface Request {
            product_data: IProductAdd
        }
    }
}

export const validateAddProd = (schema: SchemaOf<IProductAdd>) => async (req: Request, res: Response, next: NextFunction) => { 

    try {

        const data = req.body

        try {

            const validatedData = await schema.validate(data, { abortEarly: false, stripUnknown: true})

            req.product_data = validatedData

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