// tags
// ADM ONLY = no
// LOGGED IN = yes(u)

import { UserRepository } from "../../repositories/user.repository";
import { getCustomRepository } from "typeorm";
import { ErrorHandler } from "../../errors/error";

class userByIdService {

    async execute(id: string) {

        const userRepository = getCustomRepository(UserRepository)

        const uuidRegex = /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/gm

        const isValid = uuidRegex.test(id)

        if (!isValid) {
            throw new ErrorHandler(400, "Invalid user id")
        }

        const user = await userRepository.findOne({ id: id })
        if (!user) {
            throw new ErrorHandler(404, "User not found")
        }

        return user
    }
}

export default userByIdService