// tags
// ADM ONLY = no
// LOGGED IN = yes(u)

import { ProductRepository } from "../../repositories/product.repository";
import { getCustomRepository } from "typeorm";

class productListService {

    async execute() {

        const productRepository = getCustomRepository(ProductRepository)

        const product_list = await productRepository.find()

        return product_list
    }
}

export default productListService