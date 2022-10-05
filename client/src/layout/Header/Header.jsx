import { Badge } from "@material-ui/core";
import {  ShoppingCartOutlined, AccountCircleOutlined } from "@material-ui/icons";
import { Link } from 'react-router-dom';
import { mobile } from "../../responsive.js";
import React from "react";
import styled from "styled-components";
import { Navbar, Nav, Container, Offcanvas, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import zw from "../../../Assets/ZW1.jpeg";

const MenuItem = styled.div`
  font-size: 18px;
  cursor: pointer;
  margin-left: 25px;
  padding: 10px;
  color: black;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
const Header = () => {
  
  return (
    <Navbar collapseOnSelect expand="lg" >
    <Container fluid>
    <Navbar.Brand href="#home">
        <img
          alt=""
          src={zw}
          width="35"
          height="35"
          className="d-inline-block align-top"
        />{' '}
      < >ZAHARA WEARS</>
      </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto">
      <MenuItem ><Nav.Link href="#features">Features</Nav.Link> </MenuItem>
      <MenuItem><Nav.Link href="#pricing">Pricing</Nav.Link></MenuItem>
      <MenuItem><Nav.Link href="#pricing">Pricing</Nav.Link></MenuItem>
      </Nav>
      <Nav>
        <Link  to="/cart">
        <MenuItem >
            <Badge badgeContent={2} color="primary">
              <ShoppingCartOutlined style={{ color: 'black' }}/>
            </Badge>
        </MenuItem>
        </Link>
        <Link to="/login">
        <MenuItem >
            <Badge  color="primary">
              <AccountCircleOutlined style={{ color: 'black' }}/>
            </Badge>
        </MenuItem>
        </Link>
      </Nav>
    </Navbar.Collapse>
    </Container>
  </Navbar>
  );
};

export default Header;