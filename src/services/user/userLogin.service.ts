// tags
// ADM ONLY = no
// LOGGED IN = no

import { UserRepository } from "../../repositories/user.repository";
import { getCustomRepository } from "typeorm";
import { ErrorHandler } from "../../errors/error";
import { IUserLogin } from "../../interfaces/user/user.interface";
import * as bcrypt from "bcryptjs";
import { config } from "../../config/jwt.config";
import jwt from "jsonwebtoken";


class userLoginService {

    async execute({email, password}: IUserLogin) {

        const userRepository = getCustomRepository(UserRepository)

        const user = await userRepository.findOne({ email })

        if (!user) {
            throw new ErrorHandler(404, "User not found")
        }

        const pwdMatch = await bcrypt.compare(password, user.password)
        
        const token = jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email,
            isAdm: user.isAdm
        },
        config.secret,
        {expiresIn: config.expiresIn})

        if (pwdMatch) {


            return token

        } else {

            throw new ErrorHandler(401, "Wrong email/password")

        }
    }
}

export default userLoginService