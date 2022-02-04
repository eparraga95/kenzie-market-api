import { UserRepository } from "../../repositories/user.repository";
import { ProductRepository } from "../../repositories/product.repository";
import { CartRepository } from "../../repositories/cart.repository";
import { getCustomRepository } from "typeorm";
import { ErrorHandler } from "../../errors/error";
import { fixedFloat } from "../../utils";

class cartDelProdService {

    async execute(user_id: string, product_id: string) {

        const userRepository = getCustomRepository(UserRepository)

        const user = await userRepository.findOne({ id: user_id })

        const cartRepository = getCustomRepository(CartRepository)

        const cart = await cartRepository.findOne({ id: user?.cart.id })

        if (cart) {

            if (cart.products.filter(prod => prod.id === product_id).length === 0) {
                throw new ErrorHandler(404, "Product is not in the cart.")
            }

            cart.products.filter(prod => prod.id !== product_id)
            cart.subtotal = fixedFloat(cart.products.reduce((acc, prod) => acc + prod.price, 0))

            await cartRepository.save(cart)

            const updatedCart = await cartRepository.findOne({ id: cart.id })

            return updatedCart

        }



    }
}

export default cartDelProdService