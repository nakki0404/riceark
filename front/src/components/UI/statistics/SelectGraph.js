import React, { useState, useEffect, PureComponent } from "react";
import { connect } from "react-redux";
// import Image from "./images/monegi.jpg";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

// const data = [
//     { name: '1월', uv: 400, pv: 2400, amt: 2400 },
//     { name: '2월', uv: 300, pv: 1398, amt: 2210 },
//     { name: '3월', uv: 200, pv: 9800, amt: 2290 },
//     { name: '4월', uv: 278, pv: 3908, amt: 2000 },
//     { name: '5월', uv: 189, pv: 4800, amt: 2181 },
//   ];

function SelectGraph(trade_datas) {
  // console.log(trade_datas.trade_datas.trade_datas[0].Stats)
  // console.log(trade_datas)
  // console.log(trade_datas.trade_datas)
  // console.log(trade_datas.trade_datas[0].Stats)

  // const data =trade_datas.trade_datas.trade_datas[0].Stats
  const list = trade_datas.trade_datas.trade_datas.map((e) => ({
    label: e.Name,
    value: e.Stats,
  }));
  // console.log(c[0])
  // console.log(typeof c)
  const [selectedOption, setSelectedOption] = useState(list[0]);
  const [data, setData] = useState([]);
  // const handleChange = (selected) => {
  //   setSelectedOption(selected);
  //   console.log(selectedOption)
  //   setData(selectedOption.value)
  // };
  useEffect(() => {
    if (selectedOption) {
      // 선택한 항목의 value 값을 data로 설정
      setData(selectedOption.value);
    }
  }, [selectedOption]);

  const handleChange = (selected) => {
    setSelectedOption(selected);
  };
  const CustomYAxisTick = (props) => {
    const { x, y, payload } = props;
    const value = payload.value;

    // 1000 이상일 때 'k'를 붙이도록 조건 처리
    const formattedValue =
      value >= 10000 ? `${(value / 10000).toFixed(0)}만` : value;
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="middle" fill="#666">
          {formattedValue}
        </text>
      </g>
    );
  };
  // const [chartWidth, setChartWidth] = useState(500); // 초기 너비 설정
  // const [chartHeight, setChartHeight] = useState(400);
  // useEffect(() => {
  //   const handleResize = () => {
  //     // 원하는 브라우저 너비 또는 다른 로직에 따라 차트의 너비를 동적으로 계산
  //     const newWidth = window.innerWidth >= 500 ? 500 : 375; // 예시: 768px 이상일 때 500px, 미만일 때 300px로 설정
  //     const newHeight = window.innerWidth >= 500 ? 400 : 300; // 예시: 768px 이상일 때
  //     setChartHeight(newHeight);
  //     setChartWidth(newWidth);
  //   };

  //   // 초기 로드 시와 화면 크기 변경 시에 이벤트 리스너 추가
  //   window.addEventListener("resize", handleResize);

  //   // 컴포넌트 언마운트 시에 이벤트 리스너 제거
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);
  return (
    <div>
      <div className="container">
        <h1>단일 품목 검색</h1>
        <Select
          options={list}
          value={selectedOption}
          onChange={handleChange}
          isSearchable={true} // 검색 가능한 드롭다운으로 설정
          placeholder="재화를 선택하세요"
        />
      </div>
      <LineChart
        width={375}
        height={300}
        data={data}
        syncId="anyId"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: -30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date" tick={null} reversed={true} />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="AvgPrice"
          stroke="#8884d8"
          fill="#8884d8"
        />
      </LineChart>

      <AreaChart
        width={375}
        height={150}
        data={data}
        syncId="anyId"
        margin={{
          top: 0,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date" reversed={true} />
        <YAxis tick={<CustomYAxisTick />} />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="TradeCount"
          stroke="#82ca9d"
          fill="#82ca9d"
        />
      </AreaChart>
    </div>
  );
}
const mapStateToProps = (state) => ({
  items: state.items,
  lists: state.lists,
  trade_datas: state.trade_datas,
});
export default connect(mapStateToProps)(SelectGraph);
