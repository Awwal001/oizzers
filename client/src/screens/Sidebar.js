import React from "react";
import "./Assets/css/sidebar.css";
import logo from "../images/logo3.png";
import { Link } from "react-router-dom";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="Ecommerce" />
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <Link to="/admin/productlist">
        <p>
          <ListAltIcon />
          Products
        </p>
      </Link>
      <Link to="/admin/categorylist">
        <p>
          <ListAltIcon />
          Categories
        </p>
      </Link>
      <Link to="/admin/orderlist">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/admin/userlist">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
