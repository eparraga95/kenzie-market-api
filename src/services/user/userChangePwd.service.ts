import { ResetTokenRepository } from "../../repositories/reset_token.repository";
import { UserRepository } from "../../repositories/user.repository";
import { ErrorHandler } from "../../errors/error";
import { getCustomRepository } from "typeorm";
import * as bcrypt from "bcryptjs"

class userChangePwdService {

    async execute(token: string, new_password: string) {

        const resetTokenRepository = getCustomRepository(ResetTokenRepository)
        const userRepository = getCustomRepository(UserRepository)

        const userToken = await resetTokenRepository.findOne({ token: token })

        if (!token) {

            throw new ErrorHandler(401, "Invalid recovery token")
        }

        if (userToken) {

            const isValid = bcrypt.compare(token, userToken.token)

            if (!isValid) {

                throw new ErrorHandler(401, "Invalid recovery token")
            }

            let userId = userToken.user.id
            
            const user = await userRepository.findOne({ where: { id : userId } })

            if (user) {

                user.password = await bcrypt.hash(new_password, 10)
                
                await userRepository.save(user)

                await resetTokenRepository.delete(userToken)

                return "Password changed succesfully"

            } else {

                throw new ErrorHandler(404, "User not found")
            }
        }
    }
}

export default userChangePwdService

