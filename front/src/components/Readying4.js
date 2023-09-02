import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { connect } from 'react-redux';
// import Image from "./images/monegi.jpg";

function Readying(trade_datas) {
  //  trade_datas.trade_datas.trade_datas.map(e=>)
  //  stats null 무시
const allDate=  trade_datas.trade_datas.trade_datas.map(e=>e.Stats.map((item) => ({
    Date: item.Date,
    Result: Math.floor(item.AvgPrice * item.TradeCount),
  })))
  
  const combinedData1 = [].concat(...allDate);
  
  // // 결과를 계산
  function calculateResult(combinedData) {
    const result = {};
  
    combinedData.forEach((item) => {
      const { Date, Result } = item;
      if (!result[Date]) {
        result[Date] = 0;
      }
      result[Date] += Result;
    });
  
    return result;
  }

  const result1 = calculateResult(combinedData1);

const data = Object.keys(result1).map((Date) => ({
  Date,
  "총 골드 소비": result1[Date]/2,
}));

// 데이터의 평균값 계산


  // const data = [
  //   {
  //     name: 'Page A',
  //     uv: 4000,
  //     pv: 2400,
  //     amt: 2400,
  //   },
  //   {
  //     name: 'Page B',
  //     uv: 3000,
  //     pv: 1398,
  //     amt: 2210,
  //   },
  //   {
  //     name: 'Page C',
  //     uv: -1000,
  //     pv: 9800,
  //     amt: 2290,
  //   },
  //   {
  //     name: 'Page D',
  //     uv: 500,
  //     pv: 3908,
  //     amt: 2000,
  //   },
  //   {
  //     name: 'Page E',
  //     uv: -2000,
  //     pv: 4800,
  //     amt: 2181,
  //   },
  //   {
  //     name: 'Page F',
  //     uv: -250,
  //     pv: 3800,
  //     amt: 2500,
  //   },
  //   {
  //     name: 'Page G',
  //     uv: 3490,
  //     pv: 4300,
  //     amt: 2100,
  //   },
  // ];
  const CustomYAxisTick = (props) => {
    const { x, y, payload } = props;
    const value = payload.value;
    
    // 1000 이상일 때 'k'를 붙이도록 조건 처리
    const formattedValue = value >= 1000000 ? `${(value / 1000000).toFixed(0)}백만` : value;
  
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="middle" fill="#666">
          {formattedValue}
        </text>
      </g>
    );
  };
  

  return (
      <div>
      <h1>거래소 재련 재료 거래 총액</h1>
      <h6>매일 한번만 집계함으로 오늘날짜는 무시하세요</h6>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date" reversed={true}/>
        <YAxis tick={<CustomYAxisTick />}/>
        <Tooltip />
        <Legend />
        <Bar dataKey="총 골드 소비" fill="#8884d8" />
      </BarChart>
      </div>
  );
}
const mapStateToProps = (state) => ({
    // items: state.items,
    // lists: state.lists,
    trade_datas: state.trade_datas,
  });
  export default connect(mapStateToProps,)(Readying);
