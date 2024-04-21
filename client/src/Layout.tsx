import { Outlet } from 'react-router-dom'
import Container from './components/Container'
import { Navbar } from './components/navbarComp'
import { Toaster } from './components/ui/toaster'


const Layout = () => {
    return (
        <>
            <Container>
            <Navbar/>
                <Outlet />
                <Toaster />
            </Container>
        </>
    )
}

export default Layout