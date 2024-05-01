import { ICartItem } from "./products"

export interface IOrders {
    _id: string,
    userId: string,
    lineItems: ICartItem[],
    totalPrice: number,
    orderDate: string
}

export interface IOrderData {
    orders: IOrders[]
}