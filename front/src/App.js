import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate  } from 'react-router-dom';
//react-router-dom이 버전 6로 업그레이드되면서, Switch를 더이상 지원을 안하게 됬다. Switch -> routes로 바뀜. 또한 component도 element로 바꼈다.
import Calculator from './Calculator';
import Login from './Login';
// import Logout from './Logout';
import TopNavigationBar from './components/UI/TopNavigationBar';
import Signup from './Signup';
import Home from './Home';
import Rospi from './components/Rospi';
import Report from './Report';
// import Stop from './Stop';
import UpStore from './components/UpStore';
// import {
//   GoogleReCaptchaProvider,
//   useGoogleReCaptcha
// } from 'react-google-recaptcha-v3';
// import { useCallback, useEffect,useState } from 'react';

function App() {
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
      <TopNavigationBar />
      {/* <button onClick={sendTokenToServer}>Send Token to Server</button> */}
          <Routes>
          <Route path="/"element={<Home/>}/>
                  <Route path="/Calculator"element={<Calculator/>}/>
                  <Route path="/login"element={<Login/>}/>
                  {/* <Route path="/logout"element={<Logout/>}/> */}
                  <Route path="/Signup"element={<Signup/>}/>
                  <Route path="/Rospi"element={<Rospi/>}/>
                  <Route path="/Report"element={<Report/>}/>
                  <Route path="/*"element={<Home/>}/>
                  {/* 지정경로외에 접근 방지 */}
          </Routes>
          <UpStore/>      
    </Router>
  );
}
export default App;

//<Route path="/" component={Home} />
//<Route path="/" element={<Home/>}/>