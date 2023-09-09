import React, { useState, useEffect } from "react";
import "./BottomNav.css";
import axios from "axios";
const BottomNav = () => {
  const [total, setTotal] = useState(0);
  const [today, setToday] = useState(0);
  useEffect(() => {
    // API 호출을 useEffect 내부로 이동
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/total")
      .then((response) => setTotal(response.data));
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/howmany")
      .then((response) => setToday(response.data[0].todayTotal));
    // .then((response) => setToday(response.data[0].todayTotal));
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행

  return (
    <div className="BottomNav2">
      <div className="left">Total {total}</div>
      <div className="center">매일 00시 업데이트</div>
      <div className="right">Today {today}</div>
    </div>
  );
};
export default BottomNav;
