import { Outlet } from 'react-router-dom'
import Container from './components/ContainerComp'
import { Navbar } from './components/navbarComp'
import { Toaster } from './components/ui/toaster'
import { CartContext, ICartContext } from './context/cartContext'
import HeaderBanner from './components/headerBannerComp'
import axios from 'axios'
import { toast } from './components/ui/use-toast'
import { AuthActionType, AuthReducer } from './reducers/authReducer'
import { useEffect, useReducer, useState } from 'react'
import { AuthState } from './models/classes/authstate'
import { AuthContext } from './context/authContext'
import { CartProduct } from './models/classes/products'
import { ICartResponse } from './models/interfaces/products'


const Layout = () => {
  const [authedUser, dispatchAuth] = useReducer(AuthReducer, new AuthState(false, null))


  const [cartItemsState, setCartItems] = useState<ICartContext>({
    cartItems: [],
    addToCart: (product: CartProduct) => { },
    removeFromCart: (product: CartProduct) => { },
    fetchCart: async () => { },
    clearCart: () => { }
  })

  cartItemsState.fetchCart = async () => {
    try {
      const response = await axios.get<ICartResponse>('http://localhost:3000/cart/', { withCredentials: true });
      const items = response.data.cartItems.lineItems.map(item => {
        return new CartProduct(
          item.quantity,
          {
            _id: item.productDetails[0]._id,
            name: item.productDetails[0].name,
            price: item.productDetails[0].price,
            description: item.productDetails[0].description,
            image1: item.productDetails[0].image1,
            image2: item.productDetails[0].image2,
            status: item.productDetails[0].status,
            amountInStock: item.productDetails[0].amountInStock,
            category: item.productDetails[0].category
          }
        );
      });
            console.log("here are the items>>>>", items)

      console.log("here are the items>>>>", items)
      setCartItems({ ...cartItemsState, cartItems: items })
    } catch (error) {
      console.error('Failed to load cart:', error);
    }
  };

  cartItemsState.addToCart = async (product: CartProduct) => {
    //note to self cant use state check here due to async state updates. bug where unauthed user could add to cart.
    const authRes = await checkAuth()
    if (!authRes?.data.isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please log in to add items to your cart.",
      });
      return;
    }
    const clonedCart = [...cartItemsState.cartItems]
    const itemAlreadyExistsIndex = clonedCart.findIndex((clonedItem) => clonedItem.product._id === product.product._id)
    if (itemAlreadyExistsIndex !== -1) {
      clonedCart[itemAlreadyExistsIndex].quantity += 1;
      toast({
        title: "Product added to cart!",
        description: `Product ${clonedCart[itemAlreadyExistsIndex].product.name} has been added to cart`,
      })
    } else {
      clonedCart.push(product)
      toast({
        title: "Product added to cart!",
        description: `Product ${product.product.name} has been added to cart`,
      })
    }
    setCartItems(prevState => ({
      ...prevState,
      cartItems: clonedCart
    }))
    updateServerCart()
  }


  cartItemsState.removeFromCart = (product: CartProduct) => {
    const clonedCart = [...cartItemsState.cartItems]
    const selectedItemIndex = clonedCart.findIndex((item) => item.product._id === product.product._id)
    if (clonedCart[selectedItemIndex].quantity >= 2) {
      clonedCart[selectedItemIndex] = { ...clonedCart[selectedItemIndex], quantity: clonedCart[selectedItemIndex].quantity - 1 }
    } else if (clonedCart[selectedItemIndex].quantity === 1) {
      clonedCart.splice(selectedItemIndex, 1)
    }
    setCartItems(prevState => ({
      ...prevState,
      cartItems: clonedCart
    }))
    updateServerCart()
  }

  cartItemsState.clearCart = () => {
    setCartItems({ ...cartItemsState, cartItems: [] })
  }

    const updateServerCart = async () => {
      const authRes = await checkAuth()
      if (!authRes?.data.isAuthenticated) {
        toast({
          variant: "destructive",
          title: "Authentication Required",
          description: "Please log in to add items to your cart.",
        });
        return;
      }
      try {

        const updatedCartItems = cartItemsState.cartItems
        const res = await axios.post("http://localhost:3000/cart/update", updatedCartItems, { withCredentials: true })
        
      } catch(error) {
        console.log("there has been an error updating the cart", error)
      }
    }



  useEffect(() => {
    const authCheckAndFetchCart = async () => {
      const authRes = await checkAuth()
      if (authRes?.data.isAuthenticated) {
        cartItemsState.fetchCart()
      }
    }
    authCheckAndFetchCart()
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
        return res
      } else {
        dispatchAuth({ type: AuthActionType.LOGOUT, payload: { isAuthenticated: false, user: null } })
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <CartContext.Provider value={cartItemsState}>
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