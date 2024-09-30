import React, { useState } from 'react'; 
import { Nav, Navbar, Offcanvas, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link
import logo from './images/Logo.jpg'; // Import your logo image
import homeLogo from './images/home.png'; // Import logo for Home
import dashboardLogo from './images/dashboard.png'; // Import logo for Dashboard
import aboutLogo from './images/about.png'; // Import logo for About
import communityLogo from './images/community.png'; // Import logo for Community
import helpLogo from './images/help.png'; // Import logo for Help
import investLogo from './images/invest.png'; // Import logo for Help
import '../../css/Navbar.css';

function Navigationbar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Button to open Offcanvas on mobile */}
      <Button variant="primary" onClick={handleShow} className="d-lg-none">
        <img src={homeLogo} alt="Menu" style={{ width: '25px', height: '25px' }} />
      </Button>

      {/* Offcanvas for mobile view */}
      <Offcanvas show={show} onHide={handleClose} className="bg-light">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <img
              src={logo}
              alt="Logo"
              style={{ width: '70px', height: '60px', borderRadius: '50%' }}
            />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/home" className="mb-2 text-dark">
              <img src={homeLogo} alt="Home" className="me-2" style={{ height: '25px', width: '25px' }} /> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/dashboard" className="mb-2 text-dark">
              <img src={dashboardLogo} alt="Dashboard" className="me-2" style={{ height: '25px', width: '25px' }} /> Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="mb-2 text-dark">
              <img src={aboutLogo} alt="About" className="me-2" style={{ height: '25px', width: '25px' }} /> About
            </Nav.Link>
            <Nav.Link as={Link} to="/invest" className="mb-2 text-dark">
              <img src={investLogo} alt="Invest" className="me-2" style={{ height: '25px', width: '25px' }} /> Invest
            </Nav.Link>
            <h5 className="mt-3 text-dark">Support</h5>
            <Nav.Link as={Link} to="/community" className="mb-2 text-dark">
              <img src={communityLogo} alt="Community" className="me-2" style={{ height: '25px', width: '25px' }} /> Community
            </Nav.Link>
            <Nav.Link as={Link} to="/help" className="mb-2 text-dark">
              <img src={helpLogo} alt="Help" className="me-2" style={{ height: '25px', width: '25px' }} /> Help
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Desktop Navbar */}
      <div className="d-none d-lg-block sticky-top" style={{ height: '100vh', width: '210px', backgroundColor: '#f8f9fa', paddingTop: '0' }}>
        <img
          src={logo}
          alt="Logo"
          style={{ width: '70px', height: '60px', marginBottom: '20px', borderRadius: '50%', marginLeft: '21px', marginTop: '30px' }}
        />
        <Nav className="flex-column p-3">
          <Nav.Link as={Link} to="/home" className="mb-2 text-black">
            <img src={homeLogo} alt="Home" style={{ height: '25px', width: '25px', marginRight: '10px' }} /> Home
          </Nav.Link>
          <Nav.Link as={Link} to="/dashboard" className="mb-2 text-black">
            <img src={dashboardLogo} alt="Dashboard" style={{ height: '28px', width: '28px', marginRight: '9px' }} /> Dashboard
          </Nav.Link>
          <Nav.Link as={Link} to="/about" className="mb-2 text-black">
            <img src={aboutLogo} alt="About" style={{ height: '28px', width: '28px', marginRight: '10px' }} /> About
          </Nav.Link>
          <Nav.Link as={Link} to="/invest" className="mb-2 text-black">
            <img src={investLogo} alt="Invest" style={{ height: '28px', width: '28px', marginRight: '10px' }} /> Invest
          </Nav.Link>
          <h5 className="mt-3 text-black">Support</h5>
          <Nav.Link as={Link} to="/community" className="mb-2 text-black">
            <img src={communityLogo} alt="Community" style={{ height: '19px', width: '19px', marginRight: '10px' }} /> Community
          </Nav.Link>
          <Nav.Link as={Link} to="/help" className="mb-2 text-black">
            <img src={helpLogo} alt="Help" style={{ height: '28px', width: '28px', marginRight: '10px' }} /> Help
          </Nav.Link>
        </Nav>

        
      </div>
    </>
  );
}

export default Navigationbar;