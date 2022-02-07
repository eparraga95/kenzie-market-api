import * as yup from "yup"
import { SchemaOf } from "yup"
import { IMailInput } from "../../interfaces/mail/mail.interface"

const mailSchema: SchemaOf<IMailInput> = yup.object().shape({
    user_id: yup
        .string().required(),
    message: yup
        .string().required(),
    subject: yup
        .string().required()

})

export default mailSchema