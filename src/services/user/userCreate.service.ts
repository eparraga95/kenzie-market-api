// tags
// ADM ONLY = no
// LOGGED IN = no

import { UserRepository } from "../../repositories/user.repository"
import { getCustomRepository } from "typeorm";
import { ErrorHandler } from "../../errors/error";
import { IUserCreate } from "../../interfaces/user/user.interface"
import { Cart, User } from "../../entities"
import { CartRepository } from "../../repositories/cart.repository";

class userCreateService {

    async execute({ name, email, password, isAdm }: IUserCreate) {

        const userRepository = getCustomRepository(UserRepository)
        const cartRepository = getCustomRepository(CartRepository)

        const emailAlreadyExists = await userRepository.findOne({ email })

        if (emailAlreadyExists) {
            throw new ErrorHandler(409, "E-mail already registered")
        }

        const cart = new Cart()
        cart.products = []
        cart.subtotal = 0

        cartRepository.create(cart)
        await cartRepository.save(cart)
 
        const user = new User()
        user.name = name
        user.email = email
        user.password = password
        user.isAdm = isAdm
        user.cart = cart
        user.buys = []

        userRepository.create(user)
        await userRepository.save(user)

        return user

    }

}

export default userCreateService