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

        const uuidRegex = /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/gm

        const isValid = uuidRegex.test(product_id)

        if (!isValid) {
            throw new ErrorHandler(400, "Invalid product id")
        }
        
        const cart = await cartRepository.findOne({ id: user?.cart.id })

        if (cart) {

            if (cart.products.filter(prod => prod.id === product_id).length === 0) {
                throw new ErrorHandler(404, "Product is not in the cart")
            }

            cart.products = cart.products.filter(prod => prod.id !== product_id)
            cart.subtotal = fixedFloat(cart.products.reduce((acc, prod) => acc + prod.price, 0))

            await cartRepository.save(cart)

            return 

        }



    }
}

export default cartDelProdService