import React from 'react';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Axios from 'axios'
import {  useEffect, useState } from 'react';

function CustomNavbar({searchId,setSearchId,handleFilter,handleSearch}) { 


  return (
    <div>
      <Navbar  expand="lg" className="bg-body-tertiary mb-5 mt-4">
        <Container fluid>
          <Navbar.Brand  className='fw-bold' href="/main-page">Products Listing</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
          
       
            </Nav>
            <Form className="d-flex ml-4">
              <Form.Control
                type="search"
                placeholder="Enter Product ID"
                className="me-2"
                aria-label="Search"
                value={searchId}
                onChange={handleSearch}
              />
              {/* <Button className='me-3' variant="outline-success "
              onClick={handleSearch}>Search</Button> */}
            </Form>
          <Button onClick={handleFilter} variant='primary'>Filter</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default CustomNavbar; // Don't forget to export it if you're using it in other files
