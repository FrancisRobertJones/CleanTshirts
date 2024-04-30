import { CartProduct } from "@/models/classes/products";
import { IProduct } from "@/models/interfaces/products";


export function convertToCartProduct(product: IProduct, quantity = 1) {
    return new CartProduct(quantity, product);
}