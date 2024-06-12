"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './css/style.css';
import './css/bootstrap.min.css';
import { IoIosLogIn, IoMdMenu, IoLogoFacebook, IoLogoInstagram, IoLogoTwitter, IoMdInformationCircleOutline, IoIosContacts, IoIosCall } from "react-icons/io";
import axios from 'axios';
import './main.css';
import { motion } from "framer-motion";
import { Modal, Button, Form, Navbar, Nav, Row, Col, Container } from 'react-bootstrap';
import { useCookies } from 'react-cookie';

export default function RootLayout({ children }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies, setCookies, removeCookies] = useCookies(['access_token']);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!cookies.access_token);
  }, [cookies]);

  const handleCloseLogin = () => {
    setShowLogin(false);
    setError('');
  };

  const handleShowLogin = () => setShowLogin(true);

  const handleCloseRegister = () => {
    setShowRegister(false);
    setError('');
  };

  const handleShowRegister = () => setShowRegister(true);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://backend-mrsk.onrender.com/api/users/register', { username: registerUsername, phone: registerPhone, password: registerPassword });
      alert('User created');
      setRegisterUsername('');
      setRegisterPhone('');
      setRegisterPassword('');
      handleCloseRegister();
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://backend-mrsk.onrender.com/api/users/login', { username: loginUsername, password: loginPassword });
      const { token, userID } = response.data;
      setCookies('access_token', token);
      window.localStorage.setItem('userID', userID);
      setIsLoggedIn(true);
      setLoginUsername('');
      setLoginPassword('');
      handleCloseLogin();
      window.location.reload();
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Invalid username or password. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      removeCookies('access_token');
      window.localStorage.removeItem('userID');
      setIsLoggedIn(false);
      window.location.reload();
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Failed to logout');
    }
  };

  return (
    <html lang="en">
      <body>
        <Navbar className='header' bg="light" expand="lg" expanded={expanded}>
          <Container>
            <Navbar.Brand href="/">
              <Image
                src="./photo/logo.png"
                width={100}
                height={90}
                alt="Logo"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)}>
              <IoMdMenu />
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} href="/">Home</Nav.Link>
                <Nav.Link as={Link} href="Sell">Sell</Nav.Link>
                <Nav.Link as={Link} href="Rent">Rent</Nav.Link>
                <Nav.Link as={Link} href="Booking">Booking</Nav.Link>
                <Nav.Link as={Link} href="Estate">My Real Estate</Nav.Link>
              </Nav>
              <Nav className="ml-auto">
                {isLoggedIn ? (
                  <Button variant="outline-primary" className="btn-open-popup" onClick={handleLogout}><IoIosLogIn /> Logout</Button>
                ) : (
                  <>
                    <Button variant="outline-primary" className="btn-open-popup" onClick={handleShowLogin}><IoIosLogIn /> Login</Button>
                    <Button variant="outline-primary" className="btn-open-popup" onClick={handleShowRegister}><IoIosLogIn /> Sign Up</Button>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Modal show={showLogin} onHide={handleCloseLogin}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Modal.Header closeButton>
              <Modal.Title>Login</Modal.Title>
              <Image
                className="img-fluid"
                src={"/photo/logo.png"}
                width={100}
                height={100}
                alt="Logo"
              />
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleLoginSubmit}>
                <Form.Group controlId="formLoginUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control type="text" placeholder="Enter Your Username" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="formLoginPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control type="password" placeholder="Enter Your Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                </Form.Group>
                {error && <p className="text-danger">{error}</p>}
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </Form>
            </Modal.Body>
          </motion.div>
        </Modal>

        <Modal show={showRegister} onHide={handleCloseRegister}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Modal.Header closeButton>
              <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleRegisterSubmit}>
                <Form.Group controlId="formRegisterUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control type="text" placeholder="Enter Your Username" value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="formRegisterPhone">
                  <Form.Label>Phone:</Form.Label>
                  <Form.Control type="tel" placeholder="01*********" value={registerPhone} onChange={(e) => setRegisterPhone(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="formRegisterPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control type="password" placeholder="Enter Your Password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} pattern="[0-9]{5,10}" required />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Sign Up
                </Button>
              </Form>
            </Modal.Body>
          </motion.div>
        </Modal>

        <main>{children}</main>

        <footer className="mt-5 p-4 bg-light text-center">
          <Container>
            <Row>
              <Col md={6}>
                <p><Link href="#"><IoLogoFacebook /> Facebook</Link></p>
                <p><Link href="#"><IoLogoInstagram /> Instagram</Link></p>
                <p><Link href="#"><IoLogoTwitter /> Twitter</Link></p>
              </Col>
              <Col md={6}>
                <p><Link href="#"><IoMdInformationCircleOutline /> About</Link></p>
                <p><Link href="#"><IoIosContacts /> Contact</Link></p>
                <p><IoIosCall /> 01066335043</p>
              </Col>
            </Row>
          </Container>
        </footer>
      </body>
    </html>
  );
}
