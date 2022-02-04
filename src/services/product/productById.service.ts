// tags
// ADM ONLY = no
// LOGGED IN = yes

import { ProductRepository } from "../../repositories/product.repository";
import { getCustomRepository } from "typeorm";
import { ErrorHandler } from "../../errors/error";

class productByIdService {

    async execute(product_id: string) {

        const productRepository = getCustomRepository(ProductRepository)

        const product = await productRepository.findOne({ id: product_id })

        if (!product) {
            throw new ErrorHandler(404, "Product not found.")
        }

        return product
    }
}

export default productByIdService