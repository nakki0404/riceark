import React, { useEffect, useState, PureComponent } from "react";
import { connect } from "react-redux";
import "./PartialTotal.css";
// import Image from "./images/monegi.jpg";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const toPercent = (decimal, fixed = 0) => `${(decimal * 100).toFixed(fixed)}%`;

const getPercent = (value, total) => {
  const ratio = total > 0 ? value / total : 0;

  return toPercent(ratio, 2);
};

const renderTooltipContent = (o) => {
  const { payload, label } = o;
  const total = payload.reduce((result, entry) => result + entry.value, 0);
  const formattedTotal = total.toLocaleString();
  return (
    <div className="customized-tooltip-content">
      <p className="total">{`${label} (Total: ${formattedTotal}) G`}</p>
      <ul className="list">
        {payload.map((entry, index) => (
          <li key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value.toLocaleString()} G (${getPercent(
              entry.value,
              total
            )})`}
          </li>
        ))}
      </ul>
    </div>
  );
};

function PartialTotal(trade_datas) {
  // console.log(trade_datas.trade_datas.trade_datas.find(e=>e.Name=="파괴석 결정"))
  // 함수를 만들어 중복 제거
  function calculateResults(indices) {
    // indices.map((index) =>console.log(trade_datas.trade_datas.trade_datas[index]))
    return indices.map((index) =>
      trade_datas.trade_datas.trade_datas[index].Stats.map((item) => ({
        Date: item.Date,
        Result: Math.floor(item.AvgPrice * item.TradeCount),
      }))
    );
  }

  const items = trade_datas.trade_datas.trade_datas;
  const indices1 = [];

  items.forEach((item, index) => {
    if (
      item.Name === "수호석 결정" ||
      item.Name === "파괴석 결정" ||
      item.Name === "위대한 명예의 돌파석" ||
      item.Name === "오레하 융화 재료" ||
      item.Name === "야금술 : 단조 기본" ||
      item.Name === "야금술 : 단조 응용" ||
      item.Name === "야금술 : 단조 심화" ||
      item.Name === "야금술 : 수선 기본" ||
      item.Name === "야금술 : 수선 응용" ||
      item.Name === "야금술 : 수선 심화"
    ) {
      indices1.push(index);
    }
  });
  const indices2 = [];

  items.forEach((item, index) => {
    if (
      item.Name === "수호강석" ||
      item.Name === "파괴강석" ||
      item.Name === "경이로운 명예의 돌파석" ||
      item.Name === "야금술 : 단조 숙련" ||
      item.Name === "야금술 : 수선 숙련" ||
      item.Name === "상급 오레하 융화 재료"
    ) {
      indices2.push(index);
    }
  });
  const indices3 = [];

  items.forEach((item, index) => {
    if (
      item.Name === "정제된 수호강석" ||
      item.Name === "정제된 파괴강석" ||
      item.Name === "찬란한 명예의 돌파석" ||
      item.Name === "야금술 : 단조 특화" ||
      item.Name === "야금술 : 수선 특화" ||
      item.Name === "최상급 오레하 융화 재료"
    ) {
      indices3.push(index);
    }
  });
  // trade_datas.trade_datas.trade_datas.Name

  // 수결 파결 위명 융화
  // 수강 파강 경명 상융
  // 정수 정파 찬명 최상
  // const indices1 = [2, 4, 16,18];
  // const indices2 = [3, 8, 19,34];
  // const indices3 = [7, 9, 21,36];
  // const indices1 = [3, 5, 17,18];
  // const indices2 = [4, 7, 19,34];
  // const indices3 = [8, 9, 21,36];

  const combinedData1 = [].concat(...calculateResults(indices1));
  const combinedData2 = [].concat(...calculateResults(indices2));
  const combinedData3 = [].concat(...calculateResults(indices3));

  // 결과를 계산
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
  const result2 = calculateResult(combinedData2);
  const result3 = calculateResult(combinedData3);

  const data = Object.keys(result1).map((Date) => ({
    Date,
    "1340~": result1[Date],
    "1490~": result2[Date],
    "1580~": result3[Date],
  }));

  // console.log(trade_datas.trade_datas.trade_datas[0].Stats)
  // console.log(trade_datas)
  // console.log(trade_datas.trade_datas)
  // console.log(trade_datas.trade_datas[0].Stats)
  //     const a = trade_datas.trade_datas.trade_datas[3].Stats.map((item) => ({
  //       Date: item.Date,
  //       Result: item.AvgPrice * item.TradeCount,
  //     }));
  //     const b = trade_datas.trade_datas.trade_datas[5].Stats.map((item) => ({
  //       Date: item.Date,
  //       Result: item.AvgPrice * item.TradeCount,
  //     }));
  //     const c = trade_datas.trade_datas.trade_datas[17].Stats.map((item) => ({
  //       Date: item.Date,
  //       Result: item.AvgPrice * item.TradeCount,
  //     }));
  //     const d = trade_datas.trade_datas.trade_datas[4].Stats.map((item) => ({
  //       Date: item.Date,
  //       Result: item.AvgPrice * item.TradeCount,
  //     }));
  //     const e = trade_datas.trade_datas.trade_datas[7].Stats.map((item) => ({
  //       Date: item.Date,
  //       Result: item.AvgPrice * item.TradeCount,
  //     }));
  //     const f = trade_datas.trade_datas.trade_datas[19].Stats.map((item) => ({
  //       Date: item.Date,
  //       Result: item.AvgPrice * item.TradeCount,
  //     }));
  //     const g = trade_datas.trade_datas.trade_datas[8].Stats.map((item) => ({
  //       Date: item.Date,
  //       Result: item.AvgPrice * item.TradeCount,
  //     }));
  //     const h = trade_datas.trade_datas.trade_datas[9].Stats.map((item) => ({
  //       Date: item.Date,
  //       Result: item.AvgPrice * item.TradeCount,
  //     }));
  //     const i = trade_datas.trade_datas.trade_datas[21].Stats.map((item) => ({
  //       Date: item.Date,
  //       Result: item.AvgPrice * item.TradeCount,
  //     }));
  //     // console.log(trade_datas.trade_datas.trade_datas[0].Stats)

  // // a 배열의 데이터를 결과에 더하기
  // const combinedData = [...a, ...b, ...c];
  // const combinedData2 = [...d, ...e, ...f];
  // const combinedData3 = [...g, ...h, ...i];

  // const result = {};

  // combinedData.forEach((item) => {
  //   const { Date, Result } = item;
  //   if (!result[Date]) {
  //     result[Date] = 0;
  //   }
  //   result[Date] += Result;
  // });

  // console.log(result);
  // const result2 = {};

  // combinedData2.forEach((item) => {
  //   const { Date, Result } = item;
  //   if (!result[Date]) {
  //     result[Date] = 0;
  //   }
  //   result[Date] += Result;
  // });

  // console.log(result);
  // const result3 = {};

  // combinedData3.forEach((item) => {
  //   const { Date, Result } = item;
  //   if (!result[Date]) {
  //     result[Date] = 0;
  //   }
  //   result[Date] += Result;
  // });

  // console.log(result);
  // const data =trade_datas.trade_datas.trade_datas[0].Stats
  // console.log(c[0])
  // console.log(typeof c)

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
      <h1>구간별 재련 재료 거래 대금</h1>
      <h6>명파, 숨결을 제외</h6>
      <AreaChart
        width={375}
        height={300}
        data={data}
        stackOffset="expand"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date" reversed={true} />
        <YAxis
          ticks={[0, 0.25, 0.5, 0.75, 1]} // 원하는 눈금 값 지정 (0%, 25%, 50%, 75%, 100%)
          tickFormatter={(value) => `${Math.round(value * 100)}%`} // 레이블 형식 설정
        />
        <Tooltip content={renderTooltipContent} />
        <Legend />
        <Area
          type="monotone"
          dataKey="1340~"
          stackId="1"
          stroke="#8884d8"
          fill="#8884d8"
        />
        <Area
          type="monotone"
          dataKey="1490~"
          stackId="1"
          stroke="#82ca9d"
          fill="#82ca9d"
        />
        <Area
          type="monotone"
          dataKey="1580~"
          stackId="1"
          stroke="#ffc658"
          fill="#ffc658"
        />
      </AreaChart>
    </div>
  );
}

const mapStateToProps = (state) => ({
  // items: state.items,
  // lists: state.lists,
  trade_datas: state.trade_datas,
});
export default connect(mapStateToProps)(PartialTotal);
