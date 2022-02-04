// tags
// ADM ONLY = yes
// LOGGED IN = yes(ADM)

import { ProductRepository } from "../../repositories/product.repository";
import { getCustomRepository } from "typeorm";
import { ErrorHandler } from "../../errors/error";
import { IProductCreate } from "../../interfaces/product/product.interface";
import { Product } from "../../entities";

class productCreateService {

    async execute({ name, description, price, in_stock}: IProductCreate) {

        const productRepository = getCustomRepository(ProductRepository)

        const productAlreadyExists = await productRepository.findOne({ name })

        if (productAlreadyExists) {
            throw new ErrorHandler(409, "Product already registered")
        }

        const product = new Product()
        product.name = name
        product.description = description
        product.price = price
        product.in_stock = in_stock

        productRepository.create(product)
        await productRepository.save(product)

        return product
    }
}

export default productCreateService