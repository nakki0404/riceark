import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [ID, setID] = useState("");
  const [Password, setPassword] = useState("");
  const handleIDChange = (e) => {
    setID(e.target.value); // 입력된 값을 title 상태에 저장
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value); // 입력된 값을 title 상태에 저장
  };
  const handleSignup = (form) => {
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/signup", {
        Item: { ID: ID, Password: Password, Role: "" },
        Pass: form,
      })
      .then((response) => {
        console.log("Data updated successfully:", response.data);
        setID("");
        setPassword("");
        setForm("");
        touch();
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };
  const handleback = () => {
    navigate("/login");
  };

  const [pass, setPass] = useState("");

  const touch = () => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/touch")
      .then((response) => {
        setPass(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    touch();
  }, []);

  const [form, setForm] = useState("");

  const fillForm = (value) => {
    setForm(value);
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="justify-content-center">
        <Col md={20}>
          <div className="p-4 border rounded">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicID">
                <Form.Label>ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ID "
                  onChange={handleIDChange}
                  value={ID}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={handlePasswordChange}
                  value={Password}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  placeholder={`${pass}` + "를 입력해주세요 자동입력방지"}
                  onChange={(e) => fillForm(e.target.value)}
                  value={form}
                />
              </Form.Group>
              <br />
              <Button variant="secondary" onClick={() => handleSignup(form)}>
                가입신청
              </Button>{" "}
              <Button variant="dark" onClick={handleback}>
                뒤로가기
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default Signup;
