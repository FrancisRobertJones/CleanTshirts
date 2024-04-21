import { Outlet } from 'react-router-dom'
import Container from './components/Container'
import { Navbar } from './components/navbarComp'
import { Toaster } from './components/ui/toaster'
import { CartContext } from './context/cartContext'
import { useCartReducerWithLocalStorage } from './customHooks/useCartReducerWithLocalStorage'


const Layout = () => {
    const [cartItems, dispatchCart] = useCartReducerWithLocalStorage()

    return (
        <>
            <CartContext.Provider value={{ cartItems, dispatchCart }}>
                <Container>
                    <Navbar />
                    <Outlet />
                    <Toaster />
                </Container>
            </CartContext.Provider>
        </>
    )
}

export default Layout