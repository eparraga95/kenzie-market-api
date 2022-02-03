import { IProduct } from "../product/product.interface";

export interface ICart {
    id: string,
    products: IProduct[]
}