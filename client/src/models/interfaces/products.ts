export interface IAllProductsResponse {
    products: IProduct[]
}

export interface IProduct {
    _id: string,
    name: string,
    price: number,
    description: string,
    image1?: string,
    image2?: string,
    status?: string,
    amountInStock?: number,
    category?: string;
}

export interface ICartResponse {
    cartItems: {
        _id: string;
        userId: string;
        lineItemIds: string[];
        lineItems: ICartItem[];
        totalCartValue: number;
    }
}

export interface ICreateProductRes {
    insertResult: {
        acknowledged: boolean,
        insertedId: string
    } 
}

export interface ICartItem {
    productId: string,
    quantity: number,
    price: string,
    name: string,
    description: string,
    productDetails?: IProduct[];
}