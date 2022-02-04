// tags
// ADM ONLY = no
// LOGGED IN = yes(u)

import { UserRepository } from "../../repositories/user.repository";
import { getCustomRepository } from "typeorm";
import { ErrorHandler } from "../../errors/error";

class userByIdService {

    async execute(id: string) {

        const userRepository = getCustomRepository(UserRepository)

        const user = await userRepository.findOne({ id: id })

        if (!user) {
            throw new ErrorHandler(404, "User not found.")
        }

        return user
    }
}

export default userByIdService