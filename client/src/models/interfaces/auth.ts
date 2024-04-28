import { User } from "../classes/user";

export interface AuthResponse {
    isAuthenticated: boolean,
    user: User | null
}