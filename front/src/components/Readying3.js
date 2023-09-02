import React,{useState, useEffect,PureComponent} from "react";
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { BsArrowUp, BsArrowDown } from "react-icons/bs"; // 화살표 아이콘을 가져옵니다.

function Readying(trade_datas) {
    // const list= trade_datas.trade_datas.trade_datas.map(e=>({label :e.Name,value:e.Stats }))

    // let AR=trade_datas.trade_datas.trade_datas.map(e=>({Name: e.Name, Price: e.Stats.[0], Chanege:(e.Stats.[0]/e.Stats.[1]-1))
    

    let exArray = trade_datas.trade_datas.trade_datas.map(e => ({
      Name: e.Name,
      Today: e.Stats[0],
      // Today: e.Stats[0]['AvgPrice'],
      // Today: e.Stats[0].Ave 안되네.?,
     Yes: e.Stats[1]
    }));
// 존나중요 gpt 읽어보길
    let newArray = exArray.map(e => {
      const Name = e.Name;
      const TodayAvgPrice = e.Today ? e.Today.AvgPrice : 0; // 오늘 가격이 없으면 0으로 설정
      const YesAvgPrice = e.Yes ? e.Yes.AvgPrice : 0; // 어제 가격이 없으면 0으로 설정
      const Change = (TodayAvgPrice / YesAvgPrice) -1; // 어제 가격이 0인 경우를 방지하기 위해 1로 설정
    
      return {
        Name: Name,
        Price: TodayAvgPrice,
        Change: Change
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
    const filteredArray = uniqueArray.filter(item => !isNaN(item.Change));


  // // 정렬 상태와 함수
  const [sortOrder, setSortOrder] = useState("asc"); // 초기 정렬 순서: 오름차순
  const sortedArray = [...filteredArray];

  if (sortOrder === "asc") {
    sortedArray.sort((a, b) => a.Change - b.Change); // 오름차순 정렬
  } else if (sortOrder === "desc") {
    sortedArray.sort((a, b) => b.Change - a.Change); // 내림차순 정렬
  }
  // 정렬 상태와 함수
  

  // 정렬 방향에 따른 화살표 아이콘 설정
  const sortArrowIcon =
    sortOrder === "asc" ? (
      <BsArrowUp />
    ) : (
      <BsArrowDown />
    );

  // 정렬 순서 변경 함수
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div>
      <h1>전날 비교 가격변동</h1>
      
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Change<button onClick={toggleSortOrder}>{sortArrowIcon}</button></th>
          </tr>
        </thead>
        <tbody>
          {sortedArray.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.Name}</td>
              <td>{item.Price}</td>
              <td>{item.Change}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

const mapStateToProps = (state) => ({
  trade_datas: state.trade_datas,
});

export default connect(mapStateToProps)(Readying);
