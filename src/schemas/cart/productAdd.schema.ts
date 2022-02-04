import * as yup from "yup"
import { SchemaOf } from "yup"
import { IProductAdd } from "../../interfaces/cart/cart.interface"

const productAddSchema: SchemaOf<IProductAdd> = yup.object().shape({
    product_id: yup
        .string().required(),
})

export default productAddSchema