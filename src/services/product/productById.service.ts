// tags
// ADM ONLY = no
// LOGGED IN = yes

import { ProductRepository } from "../../repositories/product.repository";
import { getCustomRepository } from "typeorm";
import { ErrorHandler } from "../../errors/error";

class productByIdService {

    async execute(product_id: string) {

        const productRepository = getCustomRepository(ProductRepository)

        const uuidRegex = /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/gm

        const isValid = uuidRegex.test(product_id)

        if (!isValid) {
            throw new ErrorHandler(400, "Invalid Id")
        }

        const product = await productRepository.findOne({ id: product_id })

        if (!product) {
            throw new ErrorHandler(404, "Product not found.")
        }

        return product
    }
}

export default productByIdService