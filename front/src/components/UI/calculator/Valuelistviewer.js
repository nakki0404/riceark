//Valuelistviewer.js
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import "./Valuelistviewer.css";
import Form from "react-bootstrap/Form";
import { updateList, deleteList, addList } from "../../../redux/actions";
import axios from "axios";
import Select from "react-select";

import { connect } from "react-redux";
//타이블에서 아이디 기반으로 변경
//드롭다운 목록은 스토어 스테이트 기반
//일단 중복이름 막는쪽으로
const Valuelistviewer = ({ items, lists, addList, updateList, deleteList }) => {
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [selectedListItem, setSelectedListItem] = useState(null);
  const [localStorageKey2] = useState("tableDataKey2"); // 로컬 저장소 키
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [isButtonDisabled2, setButtonDisabled2] = useState(false);

  useEffect(() => {
    // 로컬 저장소에서 데이터 불러오기
    const savedData = localStorage.getItem(localStorageKey2);
    if (savedData) {
      setSelectedListItem(JSON.parse(savedData));
    }
  }, [localStorageKey2]);
  //의존성에 키넣는거 명쾌하게 해결안됨

  // const totalprice = selectedListItem&&selectedListItem.List.reduce(
  //   (total, item) => total + item.YDayAvgPrice * item.Quantity / item.BundleCount,
  //   0
  // ).toFixed(0);
  //selectedListItem.List 으로 items 참조
  const totalprice =
    selectedListItem &&
    selectedListItem.List.reduce((total, item) => {
      const correspondingItem = items.items.find((i) => i.Name === item.Name);
      if (correspondingItem) {
        return (
          total +
          (correspondingItem.YDayAvgPrice * item.Quantity) / item.BundleCount
        );
      }
      return total;
    }, 0).toFixed(0);

  const handlerUpdate = () => {
    setButtonDisabled2(true);
    setTimeout(() => {
      setButtonDisabled2(false);
    }, 10000); // 3초 후에 버튼을 다시 활성화
    if (isButtonDisabled2 === false) {
      selectedListItem &&
        setSelectedListItem({
          ...selectedListItem,
          Pop: selectedListItem.Pop + 1,
        });

      axios
        .post(process.env.REACT_APP_BACKEND_URL + "/popup", selectedListItem)
        .then((response) => {
          console.log("Data updated successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });

      //null reading pop 문제
      //store에서 가져온 lists의 각원소와
      //selected의 객체 구조차이 문제같ㅇ느데 아마도
      //그냥 컴포넌트 파라미터에 updatelist안넣어서 발생한듯

      selectedListItem && updateList(selectedListItem);

      // w좋아요 누르면 list를 바꿔버리ㅡㄴ데 이유를 모르겠네
    }
  };

  const handlerDelete = () => {
    setButtonDisabled(true);
    setTimeout(() => {
      setButtonDisabled(false);
    }, 10000); // 3초 후에 버튼을 다시 활성화
    if (isButtonDisabled === false) {
      selectedListItem &&
        setSelectedListItem({
          ...selectedListItem,
          Pop: selectedListItem.Pop - 1,
        });

      axios
        .post(process.env.REACT_APP_BACKEND_URL + "/popdown", selectedListItem)
        .then((response) => {
          console.log("Data updated successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });

      selectedListItem && updateList(selectedListItem);
    }
  };
  useEffect(() => {
    if (selectedTitle !== null) {
      //setSelectedListItem(/(lists.lists.find(item => item.Title === selectedTitle)));

      setSelectedListItem(() => {
        localStorage.setItem(
          localStorageKey2,
          JSON.stringify(
            lists.lists.find((item) => item.Title === selectedTitle)
          )
        );
        return lists.lists.find((item) => item.Title === selectedTitle);
      });
    }
  }, [selectedTitle]);

  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const list = lists.lists.map((e) => ({ label: e.Title, value: e.Title }));
  const handleChange = (selected) => {
    setSelectedOption(selected);
  };
  useEffect(() => {
    if (selectedOption) {
      const newData = selectedOption.value;
      setData(newData);
      handleDropdownSelect(newData, () => {
        setData(""); // 또는 필요한 다른 작업 수행
      });
    }
  }, [selectedOption]);

  const handleDropdownSelect = (title) => {
    if (title !== selectedTitle) {
      setSelectedTitle(title);
    }
  };

  return (
    <div>
      <h1>컨텐츠, 상자 상세보기</h1>
      <br />
      <div className="container">
        <Select
          options={list}
          value={selectedOption}
          onChange={handleChange}
          isSearchable={true} // 검색 가능한 드롭다운으로 설정
          placeholder="재화를 선택하세요"
        />
      </div>

      {/* <Dropdown className="my-dropdown">
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        컨텐츠 목록
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {lists.lists.map((item, index) => (
          <Dropdown.Item key={index} onClick={() => handleDropdownSelect(item.Title)}>
            {item.Title}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown> */}
      <br />
      <Table striped bordered hover className="responsive-table">
        <thead>
          <tr>
            <th>그림</th>
            <th>이름</th>
            <th>개수</th>
          </tr>
        </thead>
        <tbody>
          {selectedListItem &&
            selectedListItem.List.map((listItem, index) => (
              <tr key={index}>
                <td>
                  <img
                    title={listItem.Name}
                    src={listItem.Icon} // 이미지 파일의 URL을 여기에 입력
                  />
                </td>
                <td>{listItem.Name}</td>
                <td>{listItem.Quantity}</td>
              </tr>
            ))}
        </tbody>
      </Table>

      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            type="price"
            value={`합계 ${selectedListItem ? `${totalprice} G` : `0 G`} `}
            readOnly
            style={{ textAlign: "right" }}
          />
        </Form.Group>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  items: state.items,
  lists: state.lists,
});
export default connect(mapStateToProps, { addList, updateList, deleteList })(
  Valuelistviewer
);

// export default Valuelistviewer;
