import React, { useEffect, useState, PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { connect } from "react-redux";

function Total(trade_datas) {
  const allDate = trade_datas.trade_datas.trade_datas.map((e) =>
    e.Stats.map((item) => ({
      Date: item.Date,
      Result: Math.floor(item.AvgPrice * item.TradeCount),
    }))
  );
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
    "일별 거래 대금": result1[Date],
  }));
  const renderTooltipContent = (o) => {
    const { payload, label } = o;
    return (
      <div className="customized-tooltip-content">
        <p className="total">{`${label} `}</p>
        <ul className="list">
          {payload.map((entry, index) => (
            <li key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value.toLocaleString()} G`}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  const CustomYAxisTick = (props) => {
    const { x, y, payload } = props;
    const value = payload.value;
    // 1000 이상일 때 'k'를 붙이도록 조건 처리
    const formattedValue =
      value >= 1000000 ? `${(value / 1000000).toFixed(0)}백만` : value;
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
      <h1>일별 성장 재료 거래 대금</h1>
      <h6>거래대금=평균가*거래량</h6>
      <BarChart
        width={375}
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
        <XAxis dataKey="Date" reversed={true} />
        <YAxis tick={<CustomYAxisTick />} />
        <Tooltip content={renderTooltipContent} />
        <Legend />
        <Bar dataKey="일별 거래 대금" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

const mapStateToProps = (state) => ({
  // items: state.items,
  // lists: state.lists,
  trade_datas: state.trade_datas,
});
export default connect(mapStateToProps)(Total);
