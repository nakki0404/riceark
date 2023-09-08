//Poplist.js
// import React, { useState } from 'react';
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import { deleteList } from "../../../redux/actions";
import axios from "axios";
import "./Poplist.css";

const Poplist = ({ lists, items, deleteList }) => {
  const [sortType, setSortType] = useState(null); // 기본 정렬 방식: 없음
  const [sortDescending, setSortDescending] = useState(true); // 기본 정렬 방향: 내림차순

  const handleSortChange = (newSortType) => {
    if (newSortType === sortType) {
      setSortDescending(!sortDescending);
    } else {
      setSortType(newSortType);
      setSortDescending(true); // 새로운 정렬 방식 선택 시 기본적으로 내림차순으로 설정
    }
  };
  //한박자 늦은 출력 원인은 여기 있을텐데
  //일단 여기 아닌듯
  // 정렬된 리스트 생성
  let sortedList = [...lists.lists];
  // useEffect(() => {
  // let sortedList = [...lists.lists];
  if (sortType === "Value") {
    sortedList = sortedList.sort((a, b) => {
      const aValue = a.List.reduce((total, item) => {
        const correspondingItem = items.items.find((i) => i.Name === item.Name);
        if (correspondingItem) {
          return (
            total +
            (correspondingItem.YDayAvgPrice * item.Quantity) / item.BundleCount
          );
        }
        return total;
      }, 0);

      const bValue = b.List.reduce((total, item) => {
        const correspondingItem = items.items.find((i) => i.Name === item.Name);
        if (correspondingItem) {
          return (
            total +
            (correspondingItem.YDayAvgPrice * item.Quantity) / item.BundleCount
          );
        }
        return total;
      }, 0);

      return sortDescending ? bValue - aValue : aValue - bValue;
    });
  } else if (sortType === "Pop") {
    sortedList = sortedList.sort((a, b) => {
      return sortDescending ? b.Pop - a.Pop : a.Pop - b.Pop;
    });
  }
  // }, [lists]);
  const handleDelete = (index) => {
    const deletedItem = sortedList[index];
    // const deletedItem = sortedList.splice(index, 1)[0]; // 삭제된 아이템 저장
    const token = localStorage.getItem("token");
    // deleteList(deletedItem.Title);

    // deleteList(sortedList.splice(index, 1)[0].Title);
    // console.log(sortedList.splice(index, 1)[0].Title)
    // 한번쓸때마다 배열의 변환이 온다 스플라이스
    axios
      .post(
        process.env.REACT_APP_BACKEND_URL + "/delete1",
        { Title: deletedItem.Title },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        if (response.data === "True") {
          // 사용자 역할이 'admin'인 경우에만 실행
          deleteList(deletedItem.Title); // Redux action 호출하여 상태 업데이트
        } else {
          console.log("Access denied: Not an admin.");
          // 권한이 없는 경우에 대한 처리
        }
      })
      .catch((error) => {
        console.error("Error checking user role:", error);
        // 오류 처리
      });

    // const updatedLists = [...sortedList];
    // sortedList=[...updatedLists.splice(index, 1)]; // 해당 인덱스의 아이템 삭제
    // console.log(sortedList)
    // Redux 상태 업데이트
    // addList 액션을 사용하여 변경된 리스트를 저장합니다.
    // addList(updatedLists);

    // const updatedItems = selectedItems.filter((item, i) => i !== index);
    // setSelectedItems(updatedItems);

    // setSelectedItems((prevSelectedItems) => {
    //   const updatedItems = selectedItems.filter((item, i) => i !== index);
    //   localStorage.setItem(localStorageKey, JSON.stringify(updatedItems));
    //   return updatedItems;
    // });
  };

  return (
    <div className="poplist-container">
      <h1>컨텐츠, 상자 전체보기</h1>
      <br />
      <Table striped bordered hover className="responsive-table10">
        <thead>
          <tr>
            <th>제목</th>
            <th>
              합계
              <span
                onClick={() => handleSortChange("Value")}
                style={{ cursor: "pointer" }}
              >
                {sortType === "Value" && sortDescending ? "▼" : "▲"}
              </span>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sortedList.map((item, index) => (
            <tr key={index}>
              <td>{item.Title}</td>
              <td style={{ textAlign: "right" }}>
                {item.List.reduce((total, item) => {
                  const correspondingItem = items.items.find(
                    (i) => i.Name === item.Name
                  );
                  if (correspondingItem) {
                    return (
                      total +
                      (correspondingItem.YDayAvgPrice * item.Quantity) /
                        item.BundleCount
                    );
                  }
                  return total;
                }, 0).toLocaleString()}{" "}
                G
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
      <div>삭제는 관리자만 할 수 있어요.</div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  lists: state.lists,
  items: state.items,
});

export default connect(mapStateToProps, { deleteList })(Poplist);
