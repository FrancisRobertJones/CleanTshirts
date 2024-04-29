import { ICartAction } from "@/reducers/cartReducer";
import { CartProduct } from "@/models/classes/products";
import { Dispatch, createContext } from "react";


interface ICartContext {
    cartItems: CartProduct[],
    dispatchCart: Dispatch<ICartAction>
}

export const CartContext = createContext<ICartContext>({
    cartItems: [],
    dispatchCart: () => {}
})