import React, {useState,useEffect} from 'react';
import './TopNavigationBar.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutState } from '../../actions';
import { useSelector } from 'react-redux';

const TopNavigationBar = (isLogin,logoutState) => {
  const handlelogout =()=>{
    localStorage.removeItem('token');
    logoutState({isLogin:false})
  }
  //아...구체적으로 설명은 못하겠는데 됐다.

let now = useSelector((state) => state.isLogin.isLogin)
  return (
    <div className="top-navbar-container">
      <div className="top-navbar">
        <Link to="/">RiceArk</Link>
      </div>
      <div className="top-navbar">
        <Link to="/Calculator">재화계산기</Link>
      </div>
      <div className="top-navbar">
        <Link to="/Rospi">마켓 거래 통계</Link>
      </div>
      <div className="top-navbar">
        <Link to="/Report" >글남기기</Link>
      </div>
      { now ? (
        <div className="top-navbar">
          <Link to="/login"onClick={handlelogout} >로그아웃</Link>
        </div>
       ) : (
        <div className="top-navbar">
          <Link to="/login">로그인</Link>
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
export default connect(mapStateToProps,{logoutState})(TopNavigationBar);

