import React from 'react'
import { Container, Navbar, Nav, Button } from 'react-bootstrap'
import { Con } from '../../Contexts/Context'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
    const { currentUser, logout } = Con()

    const HandleLogOut = async () => {
        try {
            await logout()
        } catch {
            alert("Something went wrong signing out!")
        }
    }
    return (
        <header className="bg-light">
            <Container>
                <Navbar expand="lg" variant="light">
                    <Navbar.Brand  >
                   LapShop
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" >
                        <Nav className="ml-auto d-flex justify-content-center align-items-center">
                            <Nav.Item as="li">
                                <Link to="/" className="nav-link" >Shop</Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Link to="/cart" className="nav-link" >Cart</Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Link to="/login" className="nav-link" >Login</Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                {!currentUser ? <Link className="nav-link" to="/signup">Sign Up</Link> : <Button onClick={HandleLogOut} className="nav-link text-light" >Sign Out</Button>}
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        </header>
    )
}

export default Header
