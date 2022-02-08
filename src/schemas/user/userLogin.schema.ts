import * as yup from "yup";
import { IUserLogin } from "../../interfaces/user/user.interface";
import { SchemaOf } from "yup";

const userLoginSchema: SchemaOf<IUserLogin> = yup.object().shape({
    email: yup
        .string().email().required().transform((value, originalValue) => { return originalValue.toLowerCase() }),
    password: yup
        .string().required()
})

export default userLoginSchema