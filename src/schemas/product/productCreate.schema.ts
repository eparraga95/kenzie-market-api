import * as yup from "yup"
import { SchemaOf } from "yup"
import { titlelify } from "../../utils"
import { IProductCreate } from "../../interfaces/product/product.interface"

const productCreateSchema: SchemaOf<IProductCreate> = yup.object().shape({
    name: yup
        .string().required().transform((value, originalValue) => { return titlelify(originalValue) }),
    description: yup
        .string().required().max(120, "Description size limit: 120 characters."),
    price: yup
        .number().positive().required(),
    in_stock: yup
        .number().positive().integer().required(),
})

export default productCreateSchema