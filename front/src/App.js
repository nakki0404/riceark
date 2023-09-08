import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
//react-router-dom이 버전 6로 업그레이드되면서, Switch를 더이상 지원을 안하게 됬다. Switch -> routes로 바뀜. 또한 component도 element로 바꼈다.
import Calculator from "./components/UI/calculator/Calculator";
import Login from "./components/UI/Login";
import TopNavigationBar from "./components/UI/nav/TopNavigationBar";
import Signup from "./components/UI/Signup";
import Home from "./components/UI/Home";
import Rospi from "./components/UI/statistics/Rospi";
import Report from "./components/UI/Report";
import Ex from "./components/UI/Ex";
import BottomNav from "./components/UI/nav/BottomNav";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import {
//   GoogleReCaptchaProvider,
//   useGoogleReCaptcha
// } from 'react-google-recaptcha-v3';
// import { useCallback, useEffect,useState } from 'react';
function App() {
  const createCookie = () => {
    if (document.cookie.includes("user")) {
    } else {
      axios
        .get(process.env.REACT_APP_BACKEND_URL + "/total")
        .then((response) => {
          const cookieName = `user`;
          const cookieValue = response.data;
          // 쿠키 만료 날짜 설정 (예: 7일 후 만료)
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 1);
          // 쿠키 생성
          document.cookie = `${cookieName}=${cookieValue}; expires=${expirationDate.toUTCString()}; path=/;`;
          const config = {
            headers: {
              coo: document.cookie,
            },
          };
          axios
            .post(process.env.REACT_APP_BACKEND_URL + "/count", null, config)
            .then((response) => {
              console.log("Data updated successfully:");
            })
            .catch((error) => {
              console.error("Error updating data:", error);
            });
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });
    }
  };
  useEffect(() => {
    createCookie();
  }, []);
  //리캡챠 나중을 위해 남겨둠.
  //   const [recaptchaToken, setRecaptchaToken] = useState('');
  //   const { executeRecaptcha } = useGoogleReCaptcha();

  //   const handleReCaptchaVerify = useCallback(async () => {
  //     if (!executeRecaptcha) {
  //       console.log('Execute reCAPTCHA not yet available');
  //       return;
  //     }
  //     try {
  //       const token = await executeRecaptcha('yourAction');
  //       setRecaptchaToken(token); // 토큰을 상태로 저장
  // console.log(token);
  //     } catch (error) {
  //       console.error('reCAPTCHA execution error:', error);
  //     }
  //   }, [executeRecaptcha]);
  //   const sendTokenToServer = async () => {
  //     try {
  //       // 서버 엔드포인트에 POST 요청을 보냅니다.
  //       const response = await fetch('http://localhost:3001/verify-recaptcha', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ recaptchaToken }),
  //       });
  //       if (response.ok) {
  //         // 서버에서 성공적으로 검증된 경우
  //         const data = await response.json();
  //         console.log(data);
  //       } else {
  //         // 서버에서 검증 실패 또는 오류 발생 시
  //         console.error('reCAPTCHA verification failed');
  //       }
  //     } catch (error) {
  //       console.error('Error sending reCAPTCHA token to server:', error);
  //     }
  //   };
  //   useEffect(() => {
  //     handleReCaptchaVerify();
  //   }, [handleReCaptchaVerify]);
  return (
    <Router>
      <div className="top-navbar-container">
        <TopNavigationBar />
      </div>

      {/* Routes with Scroll */}
      <div className="body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Calculator" element={<Calculator />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Rospi" element={<Rospi />} />
          <Route path="/Report" element={<Report />} />
          <Route path="/Ex" element={<Ex />} />
          <Route path="/*" element={<Home />} />
          {/* 지정경로외에 접근 방지 */}
        </Routes>
      </div>
      {/* BottomNav */}
      <div className="BottomNav2">
        <BottomNav />
      </div>
    </Router>
  );
}
export default App;
