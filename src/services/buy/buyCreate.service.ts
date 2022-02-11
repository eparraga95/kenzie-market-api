import { BuyRepository } from "../../repositories/buy.repository";
import { getCustomRepository } from "typeorm";
import { ErrorHandler } from "../../errors/error"
import { Buy } from "../../entities";
import { CartRepository } from "../../repositories/cart.repository";
import { UserRepository } from "../../repositories/user.repository";
import nodemailer from "nodemailer";
import hbs from 'nodemailer-express-handlebars'
import path from "path";
import { NodemailerExpressHandlebarsOptions } from 'nodemailer-express-handlebars'
import dotenv from "dotenv"

dotenv.config()


class buyCreateService {

    async execute(user_id: string) {

        const userRepository = getCustomRepository(UserRepository)
        const cartRepository = getCustomRepository(CartRepository)
        const buyRepository = getCustomRepository(BuyRepository)

        const user = await userRepository.findOne({ id: user_id })

        const cart = await cartRepository.findOne({ id: user?.cart.id })

        if (cart && user) {

            if (cart.products.length === 0) {

                throw new ErrorHandler(400, "This cart is empty")

            }

            const buy = new Buy()
            buy.user = user
            buy.products = cart.products
            buy.total = cart.subtotal

            buyRepository.create(buy)
            await buyRepository.save(buy)

            cart.products = []
            cart.subtotal = 0
            await cartRepository.save(cart)

            // sending mail

            let products_info = "You've bought: "

            for (let i=0; i<buy.products.length; ++i) {

                if (buy.products.length === 1) {
                    products_info += `
                    ${buy.products[i].name} for
                    ${buy.products[i].price}.`
                    break
                }

                if (i === buy.products.length - 1) {
                    products_info += `and
                    ${buy.products[i].name} for
                    ${buy.products[i].price}.`

                } else {
                    products_info += `
                    ${buy.products[i].name} for
                    ${buy.products[i].price}, `
                }
            }



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
                    partialsDir: path.resolve('./src/services/buy/'),
                    defaultLayout: undefined
                },
                viewPath: path.resolve('./src/services/buy/')
            }

            transport.use('compile', hbs(handlebarOptions))

            const mailOptions = {
                from: "Kenzie Market",
                to: user.email,
                subject: "Your shopping with us!",
                template: 'buy',
                context: {
                    products: products_info,
                    total: buy.total,
                    user: user.name,
                }
            }

            transport.sendMail(mailOptions, function(error, info){
                if(error){
                    return console.log(error);
                }
            });

            return buy
        }
    }
}

export default buyCreateService