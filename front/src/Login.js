import React,{useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginState } from './actions';

function Login({isLogin,loginState}) {
  const navigate  = useNavigate();  
  const [ID,setID]=useState('');
const [Password,setPassword]=useState('');
  const handleIDChange = (e) => {
    setID(e.target.value); // 입력된 값을 title 상태에 저장
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value); // 입력된 값을 title 상태에 저장
  }
  const handleLogin = () => {
    axios.post(process.env.REACT_APP_BACKEND_URL +'/Login', { ID: ID, Password: Password })
      .then(response => {
        // 로그인 성공 시 서버에서 토큰을 받아온다고 가정
        const token = response.data.token; // 이 부분은 실제 토큰이 어떻게 제공되는지에 따라 다를 수 있습니다.
        // 토큰을 저장하고 사용하는 로직 추가
        localStorage.setItem('token', token);
        // // 토큰을 이용한 보호된 엔드포인트 접근
        loginState({isLogin:true})
        // console.log(isLogin.isLogin)
        setID("");
        setPassword("");
        navigate ('/'); // 홈페이지로 리다이렉트
        // window.location.href = window.location.href;
      })
      .catch(error => {
        console.error('Error updating data:', error);
      });
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <Row className="justify-content-center">
        <Col md={100}>
          <div className="p-4 border rounded">
            <Form>
            <Form.Group className="mb-3" controlId="formBasicID">
                <Form.Label>ID </Form.Label>
                <Form.Control type="text" placeholder="ID" onChange={handleIDChange}
            value={ID} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange}
            value={Password} />
              </Form.Group>
              <Button variant="secondary" onClick={handleLogin} >
                로그인</Button>{' '}
      <Button variant="dark"><Link to="/Signup" >회원가입</Link></Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  // items: state.items,
  // lists: state.lists,
  isLogin: state.isLogin,
});
export default connect(mapStateToProps,{loginState})(Login);

