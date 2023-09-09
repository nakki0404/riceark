import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";
import { connect } from "react-redux";
import { deleteReport } from "../../redux/actions";
import "./Report.css";
function Report({ reports, deleteReport }) {
  const [List, setList] = useState([]);
  const [Writing, setWriting] = useState({});
  useEffect(() => {
    setList([...reports.reports]);
  }, [reports]);
  const [localStorageKey3] = useState("tableDataKey3"); // 로컬 저장소 키
  useEffect(() => {
    // 로컬 저장소에서 데이터 불러오기
    const savedData = localStorage.getItem(localStorageKey3);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setWriting(parsedData);
    }
  }, [localStorageKey3]);
  useEffect(() => {
    // List 값이 변경될 때마다 LocalStorage에 저장
    localStorage.setItem(localStorageKey3, JSON.stringify(Writing));
  }, [Writing]);
  const handleTitleChange = (e) => {
    const updatedWriting = { ...Writing, Title: e.target.value }; // 입력된 값을 title 상태에 저장
    setWriting(updatedWriting);
  };
  const handleBodyChange = (e) => {
    const updatedWriting = { ...Writing, Body: e.target.value };
    // setBody(e.target.value); // 입력된 값을 Body 상태에 저장
    setWriting(updatedWriting);
  };
  const handleLogin = (value) => {
    if (Writing.Title === "" || Writing.Body === "") {
      console.log("빈글등록안됨");
    } else {
      setList([...List, Writing]);
      axios
        .post(process.env.REACT_APP_BACKEND_URL + "/report", {
          Item: Writing,
          Pass: value,
        })
        .then((response) => response.data);
      setWriting({
        Title: "",
        Body: "",
      });
      setForm("");
      touch();
    }
  };
  const handleDelete = (index) => {
    const token = localStorage.getItem("token");
    const toDeleteReport = List[index];
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/reportdel", toDeleteReport, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data === "True") {
          // 사용자 역할이 'admin'인 경우에만 실행
          deleteReport(toDeleteReport); // Redux action 호출하여 상태 업데이트
        } else {
          console.log("Access denied: Not an admin.");
        }
      })
      .catch((error) => {
        console.error("Error checking user role:", error);
      });
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
    <div className="row mb-3">
      <div className="col-2"></div>
      <div className="col-8">
        <br />
        <br />
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>제목</Form.Label>
            <Form.Control
              type="text"
              placeholder="에러 발생시 알려주세요"
              onChange={handleTitleChange}
              value={Writing.Title || ""}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea3">
            <Form.Label>내용</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="삭제는 관리자만 가능합니다."
              onChange={handleBodyChange}
              value={Writing.Body || ""}
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
          <div className="text-center">
            <Button variant="warning" onClick={() => handleLogin(form)}>
              제출
            </Button>
          </div>
          <br />
        </Form>

        <Table striped bordered hover className="responsive-table3">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {List.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>{item.Title}</Accordion.Header>
                      <Accordion.Body>{item.Body}</Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </td>
                <td className="d-flex justify-content-center">
                  <Button variant="danger" onClick={() => handleDelete(index)}>
                    삭제
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="col-2"></div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  reports: state.reports,
});
export default connect(mapStateToProps, { deleteReport })(Report);
