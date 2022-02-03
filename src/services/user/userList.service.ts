// tags
// ADM ONLY = yes
// LOGGED IN = yes(ADM)

import { UserRepository } from "../../repositories/user.repository";
import { getCustomRepository } from "typeorm"
import { ErrorHandler } from "../../errors/error";

class userListService {

    async execute() {

        const userRepository = getCustomRepository(UserRepository)

        const user_list = await userRepository.find()

        return user_list
    }
}

export default userListService