import * as yup from "yup";
import * as bcrypt from "bcryptjs";
import { IUserCreate } from "../../interfaces/user/user.interface";
import { SchemaOf } from "yup";
import { titlelify } from "../../utils";

const userCreateSchema: SchemaOf<IUserCreate> = yup.object().shape({
    name: yup
        .string().required().transform((value, originalValue) => { return titlelify(originalValue) }),
    email: yup
        .string().email().required().transform((value, originalValue) => { return originalValue.toLowerCase() }),
    password: yup
        .string().required().transform((value, originalValue) => { return bcrypt.hashSync(originalValue, 10) }),
    isAdm: yup
        .boolean().required(),
})

export default userCreateSchema