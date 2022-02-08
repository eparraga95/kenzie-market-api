import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserRecover } from "../../interfaces/user/user.interface";

const userRecoverSchema: SchemaOf<IUserRecover> = yup.object().shape({
    email: yup
        .string().email().required()
})

export default userRecoverSchema