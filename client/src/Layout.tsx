import { Outlet } from 'react-router-dom'
import Container from './components/Container'
import { Navbar } from './components/navbarComp'


const Layout = () => {
    return (
        <>
            <Container>
            <Navbar/>
                <Outlet />
            </Container>
        </>
    )
}

export default Layout