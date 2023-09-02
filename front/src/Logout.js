import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutState } from './actions';

function Logout({isLogin,logoutState}) {
  const navigate  = useNavigate();
  useEffect(() => {
      localStorage.removeItem('token');
      navigate ('/login');
      // window.location.href = window.location.href;
  }, []);


  return (
    <div>
      {/* <button onClick={handleLogout}>로그아웃</button> */}
    </div>
  );
}
const mapStateToProps = (state) => ({
  // items: state.items,
  // lists: state.lists,
  isLogin: state.isLogin,
});
export default connect(mapStateToProps,{logoutState})(Logout);


