import React, { Component } from 'react';
import './Navbar.scss';
import { Navbar, Container, NavDropdown, Nav } from 'react-bootstrap';

class NavbarGlobal extends Component {
    render() {
        return <div>
            <Navbar className="navbar" bg="light" expand="xl">
                <Container>
                    <Navbar.Toggle bsprefix="navbar-collapse-custom" aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Navbar.Brand className='left-logo' href="/">Scambi</Navbar.Brand>
                            <NavDropdown title="About Us" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/about">About Scambi</NavDropdown.Item>
                                <NavDropdown.Item href="/about">Our Story</NavDropdown.Item>
                                <NavDropdown.Item href="/about">Our Team</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Festival" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/labs">Labs</NavDropdown.Item>
                                <NavDropdown.Item href="/pinolis">Pinolis</NavDropdown.Item>
                                <NavDropdown.Item href="/filmcontest">Film Contest</NavDropdown.Item>
                                <NavDropdown.Item href="/minivents">Minivents</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Support" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/donate">Donate</NavDropdown.Item>
                                <NavDropdown.Item href="/volunteer">Volunteer</NavDropdown.Item>
                                <NavDropdown.Item href="/join-team">Join Team</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/blog" id="navbar-link">Blog</Nav.Link>
                            <Nav.Link href="/faq" id="navbar-link">FAQ</Nav.Link>
                            <a href="/rsvp" className='rsvp-button'>Attend</a>
                            <NavDropdown title="Language" id="basic-nav-dropdown" className="justify-content-end">
                                <NavDropdown.Item href="">English</NavDropdown.Item>
                                <NavDropdown.Item href="">Italian</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    }
}

export default NavbarGlobal;