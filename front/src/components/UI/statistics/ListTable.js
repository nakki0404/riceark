import React, { useState } from "react";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";
import "./ListTable.css";

function ListTable(trade_datas, items, lists) {
  // const currentState = store.getState();
  // console.log(currentState);
  // const list= trade_datas.trade_datas.trade_datas.map(e=>({label :e.Name,value:e.Stats }))

  // let AR=trade_datas.trade_datas.trade_datas.map(e=>({Name: e.Name, Price: e.Stats.[0], Chanege:(e.Stats.[0]/e.Stats.[1]-1))

  let exArray = trade_datas.trade_datas.trade_datas.map((e) => ({
    Name: e.Name,
    Today: e.Stats[0],
    // Today: e.Stats[0]['AvgPrice'],
    // Today: e.Stats[0].Ave 안되네.?,
    Yes: e.Stats[1],
  }));
  // 존나중요 gpt 읽어보길
  let newArray = exArray.map((e) => {
    const Name = e.Name;
    const TodayAvgPrice = e.Today ? e.Today.AvgPrice : 0; // 오늘 가격이 없으면 0으로 설정
    const YesAvgPrice = e.Yes ? e.Yes.AvgPrice : 0; // 어제 가격이 없으면 0으로 설정
    const Change = TodayAvgPrice / YesAvgPrice - 1; // 어제 가격이 0인 경우를 방지하기 위해 1로 설정

    return {
      Name: Name,
      Price: TodayAvgPrice,
      Change: Change,
    };
  });

  const removeDuplicates = (arr) => {
    const seen = new Set();
    return arr.filter((item) => {
      const objectString = JSON.stringify(item);
      if (!seen.has(objectString)) {
        seen.add(objectString);
        return true;
      }
      return false;
    });
  };

  // 중복 제거된 배열
  const uniqueArray = removeDuplicates(newArray);
  const filteredArray = uniqueArray.filter((item) => !isNaN(item.Change));

  // // 정렬 상태와 함수
  const [sortOrder, setSortOrder] = useState("desc"); // 초기 정렬 순서: 오름차순
  const sortedArray = filteredArray.map((e) => {
    const matchingItem = trade_datas.items.items.find((i) => i.Name === e.Name);
    return {
      Name: e.Name,
      Price: e.Price,
      Change: e.Change,
      Icon: matchingItem ? matchingItem.Icon : "기본아이콘",
    };
  });
  {
    /* trade_datas.items.map(e=>e.Icon)*/
  }

  if (sortOrder === "asc") {
    sortedArray.sort((a, b) => a.Change - b.Change); // 오름차순 정렬
  } else if (sortOrder === "desc") {
    sortedArray.sort((a, b) => b.Change - a.Change); // 내림차순 정렬
  }
  // 정렬 상태와 함수
  // 정렬 순서 변경 함수
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div>
      <h1>전날 비교 </h1>
      <div style={{ maxHeight: "800px", overflowY: "auto" }}>
        <Table className="responsive-table4">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>TodayPrice</th>
              <th>
                Change
                <span
                  onClick={() => toggleSortOrder("Value")}
                  style={{ cursor: "pointer" }}
                >
                  {sortOrder === "asc" ? "▲" : "▼"}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedArray.map((item, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={item.Icon} // 이미지 파일의 URL을 여기에 입력
                    title={item.Name}
                  />
                </td>
                <td>{item.Name}</td>
                <td>{item.Price.toLocaleString() + " G"}</td>
                <td>{(item.Change * 100).toFixed(2) + " %"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  items: state.items,
  lists: state.lists,
  trade_datas: state.trade_datas,
});

export default connect(mapStateToProps)(ListTable);
