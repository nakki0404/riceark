import React from "react";
import "./Home.css"; // 스타일 파일 불러오기
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
function Home() {
  return (
    <div className="home-container">
      <div className="logo">Rice Ark</div>
      <div className="card-list">
        <Link to="/Calculator">
          <Card className="custom-card">
            <div className="text">
              컨텐츠 보상, 상자의 가격을 골드로 계산해봅니다.
              <br />
              <br />
            </div>
            <Card.Body>
              <Button variant="primary">재화 계산기</Button>
            </Card.Body>
          </Card>
        </Link>
        <Link to="/Rospi">
          <Card className="custom-card">
            <div className="text">
              <br />
              재련 재료 거래 통계 <br />
              <br />
            </div>
            <Card.Body>
              <Button variant="primary">마켓 거래 통계</Button>
            </Card.Body>
          </Card>
        </Link>
        <Link to="/Report">
          <Card className="custom-card">
            <div className="text">
              <br />
              에러 발생시 알려주세요
              <br />
              <br />
            </div>
            <Card.Body>
              <Button variant="primary">글남기기</Button>
            </Card.Body>
          </Card>
        </Link>
      </div>
    </div>
  );
}

export default Home;
