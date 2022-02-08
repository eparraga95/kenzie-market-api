import nodemailer from "nodemailer";
import hbs from 'nodemailer-express-handlebars'
import path from "path";
import { UserRepository } from "../../repositories/user.repository";
import { getCustomRepository } from "typeorm";
import { ErrorHandler } from "../../errors/error";
import { IMailInput } from "../../interfaces/mail/mail.interface";
import { NodemailerExpressHandlebarsOptions } from 'nodemailer-express-handlebars'
import dotenv from "dotenv"

dotenv.config()

class sendMailService {

    async execute({user_id, subject, message}: IMailInput, admin_id: string) {

        const userRepository = getCustomRepository(UserRepository)

        const user = await userRepository.findOne({ id: user_id })

        if (!user) {
            throw new ErrorHandler(404, "User not found.")
        }

        const admin = await userRepository.findOne({ id: admin_id})

        if (user && admin) {

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
                    partialsDir: path.resolve('./src/services/mail/'),
                    defaultLayout: undefined
                },
                viewPath: path.resolve('./src/services/mail/')
            }

            transport.use('compile', hbs(handlebarOptions))
            
            const mailOptions = {
                from: admin.email,
                to: user.email,
                subject: subject,
                template: 'email',
                context: {
                    user: user.name,
                    admin: admin.name,
                    subject: subject,
                    message: message,
                }
            }

            transport.sendMail(mailOptions, function(error, info){
                if(error){
                    return console.log(error);
                }
                return "Message sent."
            });
        }
    } 
}

export default sendMailService
