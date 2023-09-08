import React, { useState, useEffect } from "react";
import "./TopNavigationBar.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutState } from "../../../redux/actions";
import { useSelector } from "react-redux";

import riceimage from "../../../asset/png/icons8-rice-64.png";
import calculatorimage from "../../../asset/png/icons8-calculator-64.png";
import letterimage from "../../../asset/png/icons8-letter-64.png";
import loginimage from "../../../asset/png/icons8-login-64.png";
import logoutimage from "../../../asset/png/icons8-logout-64.png";
import statisticimage from "../../../asset/png/icons8-statistic-64.png";

const TopNavigationBar = (isLogin, logoutState) => {
  const handlelogout = () => {
    localStorage.removeItem("token");
    logoutState({ isLogin: false });
  };
  //아...구체적으로 설명은 못하겠는데 됐다.

  let now = useSelector((state) => state.isLogin.isLogin);
  return (
    <div className="top-navbar-container">
      <div className="top-navbar">
        <Link to="/">
          <img
            src={riceimage}
            alt="rice icon by Icons8"
            title="rice icon by Icons8"
          />
          <div className="top-navbartext">RiceArk</div>
        </Link>
      </div>
      <div className="top-navbar">
        <Link to="/Calculator">
          <img
            src={calculatorimage}
            alt="calculator icon by Icons8"
            title="calculator icon by Icons8"
          />
          <div className="top-navbartext">재화계산기</div>
        </Link>
      </div>
      <div className="top-navbar">
        <Link to="/Rospi">
          <img
            src={statisticimage}
            alt="statistic icon by Icons8"
            title="statistic icon by Icons8"
          />
          <div className="top-navbartext">마켓 거래 통계</div>
        </Link>
      </div>
      <div className="top-navbar">
        <Link to="/Report">
          <img
            src={letterimage}
            alt="Letter icon by Icons8"
            title="Letter icon by Icons8"
          />
          <div className="top-navbartext">글남기기</div>
        </Link>
      </div>
      {now ? (
        <div className="top-navbar">
          <Link to="/login" onClick={handlelogout}>
            <img
              src={logoutimage}
              alt="logout icon by Icons8"
              title="logout icon by Icons8"
            />
            <div className="top-navbartext">로그아웃</div>
          </Link>
        </div>
      ) : (
        <div className="top-navbar">
          <Link to="/login">
            <img
              src={loginimage}
              alt="login icon by Icons8"
              title="login icon by Icons8"
            />
            <div className="top-navbartext">로그인</div>
          </Link>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  // items: state.items,
  // lists: state.lists,
  isLogin: state.isLogin,
});
export default connect(mapStateToProps, { logoutState })(TopNavigationBar);
