import { CartProduct } from "@/models/classes/products";
import { createContext } from "react";


export interface ICartContext {
    cartItems: CartProduct[],
    addToCart: (product: CartProduct) => void,
    removeFromCart: (product: CartProduct) => void,
    fetchCart: () => Promise<void>,
    clearCart: () => void
}

export const CartContext = createContext<ICartContext>({
    cartItems: [],
    addToCart: (product: CartProduct) => {},
    removeFromCart: (product: CartProduct) => {},
    fetchCart: async () => {},
    clearCart: () => {}
})