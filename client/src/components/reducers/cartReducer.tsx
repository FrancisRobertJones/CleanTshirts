import { CartProduct } from "@/models/classes/products"
import { IProduct } from "@/models/interfaces/products"


export interface ICartAction {
    type: CartActionType,
    payload?: IProduct | null,
}

export enum CartActionType {
    ADDTOCART,
    REMOVEFROMCART,
    EMPTYCART
}

export const CartReducer = (cartItems: CartProduct[], action: ICartAction) => {

    if (action.type === CartActionType.ADDTOCART) {
        if (action.payload && action.payload._id) {
            const clonedCart = [...cartItems]
            const itemThatsAlreadyAdded = clonedCart.find((item) => item.product._id === action.payload?._id)
            if (itemThatsAlreadyAdded) {
                itemThatsAlreadyAdded.quantity++
            } else {
                clonedCart.push(new CartProduct(1, action.payload))
            }
            return clonedCart
        }
    }

    if (action.type === CartActionType.REMOVEFROMCART) {
        const clonedCart = [...cartItems]
        const selectedItemIndex = clonedCart.findIndex((item) => item.product._id === action.payload?._id)

        if (clonedCart[selectedItemIndex].quantity >= 2) {
            clonedCart[selectedItemIndex] = { ...clonedCart[selectedItemIndex], quantity: clonedCart[selectedItemIndex].quantity - 1 }
        } else if (clonedCart[selectedItemIndex].quantity === 1) {
            clonedCart.splice(selectedItemIndex, 1)
        }

        return clonedCart
    }

    if (action.type === CartActionType.EMPTYCART) {
        return []
    } 
    return cartItems;
}