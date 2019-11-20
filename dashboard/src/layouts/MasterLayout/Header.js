import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Nav,
  NavItem,
} from 'reactstrap';

const Header = () => (
  <React.Fragment>
    <Nav className="d-md-down-none" navbar>
      <NavItem className="px-3">
        <NavLink to="/scan" className="nav-link">
          Scanning
        </NavLink>
      </NavItem>
    </Nav>
  </React.Fragment>
);

export default Header;
