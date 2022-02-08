import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserChangePwd } from "../../interfaces/user/user.interface";
import * as bcrypt from "bcryptjs";

const userChangePwdSchema: SchemaOf<IUserChangePwd> = yup.object().shape({
    token: yup
        .string().required(),
    new_password: yup
        .string().required().transform((value, originalValue) => { return bcrypt.hashSync(originalValue, 10) }),
    new_password_confirm: yup
        .string().required().oneOf([yup.ref('new_password'), null], 'Passwords must match')
})

export default userChangePwdSchema