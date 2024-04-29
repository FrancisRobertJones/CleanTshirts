import { Outlet } from 'react-router-dom'
import Container from './components/ContainerComp'
import { Navbar } from './components/navbarComp'
import { Toaster } from './components/ui/toaster'
import { CartContext } from './context/cartContext'
import { useCartReducerWithLocalStorage } from './customHooks/useCartReducerWithLocalStorage'
import HeaderBanner from './components/headerBannerComp'
import axios from 'axios'
import { toast } from './components/ui/use-toast'
import { AuthActionType, AuthReducer } from './reducers/authReducer'
import { useEffect, useReducer } from 'react'
import { AuthState } from './models/classes/authstate'
import { AuthContext } from './context/authContext'
import { CartReducer } from './reducers/cartReducer'
import { CartState } from './models/classes/cartstate'


const Layout = () => {
  const cartState = {
    cartItems: []
  }
  const [cartItems, dispatchCart] = useReducer(CartReducer, cartState)
  const [authedUser, dispatchAuth] = useReducer(AuthReducer, new AuthState(false, null))

  const loadCart = async () => {
    try {
      const response = await axios.get('http://localhost:3000/cart', { withCredentials: true });
      dispatchCart({ type: 'SET_CART', payload: response.data });
    } catch (error) {
      console.error('Failed to load cart:', error);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);


  const logOut = async () => {
    try {
      const res = await axios.get("http://localhost:3000/auth/logout", { withCredentials: true })
      console.log(res.data)

      dispatchAuth({ type: AuthActionType.LOGOUT, payload: { isAuthenticated: false, user: null } })
    } catch (err) {
      toast({
        title: "You have been logged out!",
        description: "Succesfully logged out"
      })
      console.log(err)
    }
  }

  const checkAuth = async () => {
    try {
      const res = await axios.get("http://localhost:3000/auth/authcheck", { withCredentials: true })
      if (res.data.isAuthenticated) {
        const userData = res.data
        console.log(userData, "this is the userdata")
        dispatchAuth({ type: AuthActionType.LOGIN, payload: userData })
        console.log(res.data, "this is the auth data from rendering")
      } else {
        dispatchAuth({ type: AuthActionType.LOGOUT, payload: { isAuthenticated: false, user: null } })
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <>
      <CartContext.Provider value={{ cartItems, dispatchCart }}>
        <AuthContext.Provider value={{ dispatchAuth, logOut, authedUser, checkAuth }}>
          <Container>
            <Navbar />
            <HeaderBanner />
            <Outlet />
            <Toaster />
          </Container>
        </AuthContext.Provider>
      </CartContext.Provider>
    </>
  )
}

export default Layout