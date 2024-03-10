import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-5">
        <Row>
          <Col className='text-center py-3'>
            &copy; {new Date().getFullYear()} My Online Book Store. All Rights Reserved.
          </Col>
        </Row>
    </footer>
  );
};

export default Footer;
