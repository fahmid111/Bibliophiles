import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
/* import { Button } from './ButtonSignUp'; */
import './NavbarMain.css';


const NavbarMainPage = () => {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/" className='navbar-logo'> <strong class="black"> <h2>
          <p>
              Bibliophiles
              <i class='fas fa-book' />
            </p>
            </h2> </strong> </Navbar.Brand>
          <Nav className="navitem01 navbar-nav mr-auto">
            <Nav.Link href="#admin"> <strong className='nav-item-font01 '> Admin Section </strong></Nav.Link>
            <Nav.Link href="#reader"><strong className='nav-item-font01'> Reader Section  </strong></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarMainPage;
