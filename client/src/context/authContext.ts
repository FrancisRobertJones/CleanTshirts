import { ICartAction } from "@/components/reducers/cartReducer";
import { AuthState } from "@/models/classes/auth";
import { CartProduct } from "@/models/classes/products";
import { IAuthAction } from "@/reducers/authReducer";
import { Dispatch, createContext } from "react";


export interface IAuthContext {
    authedUser: AuthState,
    dispatchAuth: Dispatch<IAuthAction>,
    logOut: () => void,
    checkAuth: () => void
}

export const AuthContext = createContext<IAuthContext>({
    authedUser: new AuthState(false, null),
    logOut: () => {},
    dispatchAuth: () => {},
    checkAuth: () => {}
})