/* import { CartProduct } from "@/models/classes/products"
import { IProduct } from "@/models/interfaces/products"


export interface ICartAction {
    type: CartActionType,
    payload?: CartProduct | CartProduct[] |null,
}

export enum CartActionType {
    LOADCART,
    ADDTOCART,
    REMOVEFROMCART,
    EMPTYCART
}

export const CartReducer = (cartItems: CartProduct[], action: ICartAction): CartProduct[] => {
    if (action.type === CartActionType.LOADCART) {
        return action.payload as CartProduct[]
    }

    if (action.type === CartActionType.ADDTOCART) {
        if (action.payload && !Array.isArray(action.payload)) {
            const clonedCart = [...cartItems]
            const itemAlreadyExistsIndex = clonedCart.findIndex((item) => item.product._id === action.payload?.product._id)
            if (itemAlreadyExistsIndex - 1) {
                clonedCart[itemAlreadyExistsIndex].quantity + 1;
            } else {
                clonedCart.push(action.payload)
            }
            return clonedCart
        }
    }

    if (action.type === CartActionType.REMOVEFROMCART) {
        if (action.payload && action.payload.product) {
            const clonedCart = [...cartItems]
            const selectedItemIndex = clonedCart.findIndex((item) => item.product._id === action.payload?.product._id)
            if (clonedCart[selectedItemIndex].quantity >= 2) {
                clonedCart[selectedItemIndex] = { ...clonedCart[selectedItemIndex], quantity: clonedCart[selectedItemIndex].quantity - 1 }
            } else if (clonedCart[selectedItemIndex].quantity === 1) {
                clonedCart.splice(selectedItemIndex, 1)
            }
            return clonedCart
        }
    }

    if (action.type === CartActionType.EMPTYCART) {
        return []
    }
    return cartItems;

} */