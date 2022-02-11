import { ProductRepository } from "../../repositories/product.repository";
import { UserRepository } from "../../repositories/user.repository";
import { CartRepository } from "../../repositories/cart.repository";
import { getCustomRepository } from "typeorm";
import { ErrorHandler } from "../../errors/error";
import { IProductAdd } from "../../interfaces/cart/cart.interface";
import { fixedFloat } from "../../utils";

class cartAddProdService {

    async execute(product_data: IProductAdd, user_id: string) {

        const { product_id } = product_data

        const userRepository = getCustomRepository(UserRepository)

        const user = await userRepository.findOne({ id: user_id })

        const cartRepository = getCustomRepository(CartRepository)

        const cart = await cartRepository.findOne({ id: user?.cart.id })

        const productRepository = getCustomRepository(ProductRepository)

        const uuidRegex = /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/gm

        const isValid = uuidRegex.test(product_id)

        if (!isValid) {
            throw new ErrorHandler(400, "Invalid product id")
        }

        const product = await productRepository.findOne({ id: product_id })

        if (!product) {
            throw new ErrorHandler(404, "Product not found.")
        }

        if (cart && product) {
            
            if (cart.products.filter(prod => prod.name === product.name).length > 0) {
                throw new ErrorHandler(409, "Product is already in the cart")
            }

            cart.products = [...cart.products, product]
            cart.subtotal = fixedFloat(cart.subtotal + product.price)

            await cartRepository.save(cart)

            const updatedCart = await cartRepository.findOne({ id: cart.id })

            return updatedCart
        }

    }
}

export default cartAddProdService