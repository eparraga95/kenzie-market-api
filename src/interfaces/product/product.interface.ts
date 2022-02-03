export interface IProduct {
    id: string,
    name: string,
    description: string,
    price: number,
    in_stock: number
}

export interface IProductCreate {
    name: string,
    description: string,
    price: number,
    in_stock: number
}