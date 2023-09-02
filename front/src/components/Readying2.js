import React,{useState, useEffect,PureComponent} from "react";
import { connect } from 'react-redux';
// import Image from "./images/monegi.jpg";
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
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
  } from 'recharts';

// const data = [
//     { name: '1월', uv: 400, pv: 2400, amt: 2400 },
//     { name: '2월', uv: 300, pv: 1398, amt: 2210 },
//     { name: '3월', uv: 200, pv: 9800, amt: 2290 },
//     { name: '4월', uv: 278, pv: 3908, amt: 2000 },
//     { name: '5월', uv: 189, pv: 4800, amt: 2181 },
//   ];

function Readying(trade_datas) {
    // console.log(trade_datas.trade_datas.trade_datas[0].Stats)
    // console.log(trade_datas)
    // console.log(trade_datas.trade_datas)
    // console.log(trade_datas.trade_datas[0].Stats)
    
    // const data =trade_datas.trade_datas.trade_datas[0].Stats
    const list= trade_datas.trade_datas.trade_datas.map(e=>({label :e.Name,value:e.Stats }))
    // console.log(c[0])
    // console.log(typeof c)
    const [selectedOption, setSelectedOption] = useState(null);
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
    return (
        <div>
         <div className="container">
      <h1>재화를 검색하세요</h1>
      <Select
        options={list}
        value={selectedOption}
        onChange={handleChange}
        isSearchable={true} // 검색 가능한 드롭다운으로 설정
        placeholder="재화를 선택하세요"
      />
      
    </div>
          <LineChart
            width={500}
            height={300}
            data={data}
            syncId="anyId"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Date" tick={null}reversed={true}/>
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="AvgPrice" stroke="#8884d8" fill="#8884d8" />
          </LineChart>
        
          <AreaChart
            width={500}
            height={200}
            data={data}
            syncId="anyId"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Date"reversed={true}/>
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="TradeCount" stroke="#82ca9d" fill="#82ca9d" />
          </AreaChart>
          
      </div>

    );
}
const mapStateToProps = (state) => ({
    // items: state.items,
    // lists: state.lists,
    trade_datas: state.trade_datas,
  });
  export default connect(mapStateToProps,)(Readying);
