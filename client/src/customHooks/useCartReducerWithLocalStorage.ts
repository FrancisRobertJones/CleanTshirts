import { Dispatch, useEffect, useReducer } from "react"
import { CartProduct } from "@/models/classes/products";
import { CartReducer, ICartAction } from "@/reducers/cartReducer";



export const useCartReducerWithLocalStorage = (): [CartProduct[], Dispatch<ICartAction>] => {
    const initialiseCart = () => {
        const lsCart = localStorage.getItem("cart");
        if (lsCart) {
            return JSON.parse(lsCart);
        } else {
            return [];
        }
    };

    const [cartItems, dispatchCart] = useReducer(CartReducer, [], initialiseCart)

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems))
    }, [cartItems])

    return [cartItems, dispatchCart]
}