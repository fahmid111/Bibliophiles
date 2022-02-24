import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import logout from '../Logout/logout';
/* import { Button } from './ButtonSignUp'; */
import './NavbarAdmin.css';


const NavbarAdmin = () => {
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
      <Navbar bg="light" variant="light" fixed="top">
        <Container>
          <Navbar.Brand href="/admin-homepage" className='navbar-logo'> <strong class="black"> <h2>
          <p>
              Bibliophiles
              <i class='fas fa-book' />
            </p>
            </h2> </strong> </Navbar.Brand>
          <Nav className="navitem01 navbar-nav mr-auto">
            <Nav.Link href="/admin-homepage" style={{paddingLeft: "50px"}}> <strong > Home </strong></Nav.Link>
            <Nav.Link href="/manage-books" style={{paddingLeft: "20px"}}><strong > Books  </strong></Nav.Link>
            <Nav.Link href="/manage-authors" style={{paddingLeft: "20px"}}><strong > Authors  </strong></Nav.Link>
            <Nav.Link href="/manage-publishers" style={{paddingLeft: "20px"}}><strong > Publishers  </strong></Nav.Link>
            <Nav.Link href="/manage-genres" style={{paddingLeft: "20px"}}><strong > Genres  </strong></Nav.Link>

            {/* <SearchBar /> */}
          </Nav>
          
        <div class="d-flex align-items-center">
        <button type="button" class="btn btn-link px-3 me-2" onClick={logout}>
          <strong className='nav-item-font01'> Logout </strong>
        </button>
        <Nav.Link href="/admin-profile">
        <button type="button" class="btn btn-primary me-3">
        <strong className='nav-item-font01'><i class="fas fa-user-circle"></i> Profile </strong>
        </button>
        </Nav.Link>
      </div>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarAdmin;
