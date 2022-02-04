// tags
// ADM ONLY = yes
// LOGGED IN = yes(ADM)

import { UserRepository } from "../../repositories/user.repository";
import { CartRepository } from "../../repositories/cart.repository";
import { getCustomRepository } from "typeorm";
import { ErrorHandler } from "../../errors/error";

class cartByUserIdService {

    async execute(user_id: string) {

        const userRepository = getCustomRepository(UserRepository)

        const user = await userRepository.findOne({ id: user_id })

        if (user) {

            const user_cart = user.cart

            return user_cart
        }
    }
}

export default cartByUserIdService