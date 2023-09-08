import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { loginState } from "../../redux/actions";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

function Ex({ isLogin, loginState }) {
  return <div></div>;
}

const mapStateToProps = (state) => ({
  isLogin: state.isLogin,
});
export default connect(mapStateToProps, { loginState })(Ex);
