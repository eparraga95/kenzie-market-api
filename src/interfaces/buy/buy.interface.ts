import { IProduct } from "../product/product.interface";
import { IUser } from "../user/user.interface";

export interface IBuy {
    id: string,
    user: IUser,
    products: IProduct[]
}