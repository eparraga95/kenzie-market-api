import { BuyRepository } from "../../repositories/buy.repository";
import { getCustomRepository } from "typeorm";
import { ErrorHandler } from "../../errors/error"
import { Buy } from "../../entities";
import { CartRepository } from "../../repositories/cart.repository";
import { UserRepository } from "../../repositories/user.repository";

class buyCreateService {

    async execute(user_id: string) {

        const userRepository = getCustomRepository(UserRepository)
        const cartRepository = getCustomRepository(CartRepository)
        const buyRepository = getCustomRepository(BuyRepository)

        const user = await userRepository.findOne({ id: user_id })

        const cart = await cartRepository.findOne({ id: user?.cart.id })

        if (cart && user) {

            if (cart.products.length === 0) {

                throw new ErrorHandler(400, "This cart is empty.")

            }

            const buy = new Buy()
            buy.user = user
            buy.products = cart.products
            buy.total = cart.subtotal

            buyRepository.create(buy)
            await buyRepository.save(buy)

            cart.products = []
            cart.subtotal = 0
            await cartRepository.save(cart)

            return buy
        }
    }
}

export default buyCreateService