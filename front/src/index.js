import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import store from "./redux/store";
import UpStore from "./components/notUI/UpStore";

// import {
//   GoogleReCaptchaProvider,
//   useGoogleReCaptcha,
// } from "react-google-recaptcha-v3";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <GoogleReCaptchaProvider reCaptchaKey="6Lft39snAAAAANkk0UBF-UcAWL_mF4jiEhiludil">
  <Provider store={store}>
    <UpStore />

    <App />
  </Provider>
  // </GoogleReCaptchaProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
