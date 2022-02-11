import { UserRepository } from "../../repositories/user.repository";
import { ResetTokenRepository } from "../../repositories/reset_token.repository";
import { ErrorHandler } from "../../errors/error";
import { getCustomRepository } from "typeorm";
import { ResetToken } from "../../entities/reset_token.entity";
import crypto from "crypto"
import * as bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import hbs from 'nodemailer-express-handlebars'
import path from "path";
import { NodemailerExpressHandlebarsOptions } from 'nodemailer-express-handlebars'
import dotenv from "dotenv"
import { IUserRecover } from "../../interfaces/user/user.interface";

dotenv.config()

class userRecoverPwdService {

    async execute(user_email: string) {

        const userRepository = getCustomRepository(UserRepository)
        const resetTokenRepository = getCustomRepository(ResetTokenRepository)

        const user = await userRepository.findOne({ email: user_email })

        if (!user) {

            throw new ErrorHandler(404, "User not found.")
        }

        const token = await resetTokenRepository.findOne({ where: { user: user }})

        if (token) {

            await resetTokenRepository.delete(token)
        }

        let resetToken = crypto.randomBytes(32).toString("hex")
        let hash = await bcrypt.hash(resetToken, 10)

        const newToken = new ResetToken()
        newToken.created_at = new Date()
        newToken.token = hash
        newToken.user = user

        resetTokenRepository.create(newToken)
        await resetTokenRepository.save(newToken)

        const transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS,
            },
        })

        const handlebarOptions: NodemailerExpressHandlebarsOptions = {
            viewEngine: {
                partialsDir: path.resolve('./src/services/user/'),
                defaultLayout: undefined
            },
            viewPath: path.resolve('./src/services/user/')
        }

        transport.use('compile', hbs(handlebarOptions))
        
        const mailOptions = {
            from: "Kenzie Market",
            to: user.email,
            subject: "Password Recover",
            template: 'recover',
            context: {
                user: user.name,
                token: hash,
            }
        }

        transport.sendMail(mailOptions, function(error, info){
            
            if(error){
                return console.log(error);
            }

            return
        });

        return "An e-mail was sent to you with a password recover token"
    }
}

export default userRecoverPwdService