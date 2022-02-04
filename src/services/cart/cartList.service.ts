import { CartRepository } from "../../repositories/cart.repository";
import { getCustomRepository } from "typeorm";

class cartListService {

    async execute() {

        const cartRepository = getCustomRepository(CartRepository)

        const cart_list = await cartRepository.find()

        return cart_list
    }
}

export default cartListService