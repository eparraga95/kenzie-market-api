import { IBuy } from "../buy/buy.interface";
import { ICart } from "../cart/cart.interface";

export interface IUser {
    name: string,
    email: string,
    password: string,
    isAdm: boolean,
    cart: ICart
    buys: IBuy[],
}

export interface ISafeUser {
    name: string,
    email: string,
    password?: string,
    isAdm: boolean,
    cart: ICart,
    buys: IBuy[]
}

export interface IUserCreate {
    name: string,
    email: string,
    password: string,
    isAdm: boolean
}

export interface IUserLogin {
    email: string,
    password: string
}

export interface IUserRecover {
    email: string,
}

export interface IUserChangePwd {
    token: string,
    new_password: string,
    new_password_confirm: string
}