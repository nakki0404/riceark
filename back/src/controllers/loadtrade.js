// loadMarket.js
const mongoose = require("mongoose");
const axios = require("axios");
const trading_data = require("../model/trading_data");
const marketList = require("../model/market");

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ttcs9nu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });

// const authorizationToken = process.env.API_KEY

const authorizationToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAxNDQ2MzkifQ.mYsj_wkn91cxGt1Y2WPyZmJR3rdbu3NwtSg500oj91Su6Quqvn3msXQcD_jPhOThRH_pLKLDT9_Z0c3cqZWZD2p1Uizs9azDWroo3nDXQzjcqLYPNUDGTdnge7QRBSk2iPJuRRyo6n99rMAsD1H7gCtpQF5OCiyUeq3WPv4klovdd0oqpWDf7-0FNUUf-s3NR5qk1guD_f7-lpbZUptq2cwHfsJfH0pX5cnfCG3017Hd30ZaLXJ2M4X3P3vfpUkmEwsIMGcPrQjHGfcIz9kU2rH65ZoowIIwN1tWUAwrXBBvvrTPE2W7V6Mqex-5yiFF5SN9HEVl9d1COQpDrDbngA"; // JWT 토큰을 여기에 입력

const getPageData = async (Id) => {
  const config = {
    method: "get",
    url: `https://developer-lostark.game.onstove.com/markets/items/${Id}`,
    headers: {
      accept: "application/json",
      authorization: `bearer ${authorizationToken}`,
      "content-Type": "application/json",
    },
  };

  try {
    const response = await axios(config);
    // console.log(response.data)
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// getPageData();
const loadtrade = async () => {
  // const IdList = await marketList.find({"Id":"Id>10000000"},{"Id":1});
  const IdList = await marketList.find({ Id: { $gt: 10000000 } }, { Id: 1 });
  const promises = [];
  // console.log(IdList);
  promises.push(...IdList.map((item) => getPageData(item.Id)));
  // promises.push(getPageData(pageNo));
  // for (let pageNo = 1; pageNo <= 6; pageNo++) {
  //   promises.push(getPageData(pageNo));
  // }
  const resultArrays = await Promise.all(promises);
  const lists = resultArrays.flat(); // Flatten the array of arrays
  // lists.forEach(list=>{async()=>{
  for (const list of lists) {
    const filter = { Name: list.Name };
    const existingDoc = await trading_data.findOne(filter);
    //같은 객체를 찾고
    if (existingDoc) {
      // 기존 문서가 있으면, Stats 배열을 업데이트합니다.
      const existingDocStats = existingDoc.Stats ? existingDoc.Stats : [];
      //있으면 기존객체 배열을 가져온다
      const listStats = list.Stats ? list.Stats : [];
      // 오늘짜 list 원소의 stat
      listStats.forEach((listStat) => {
        const existingStatIndex = existingDocStats.findIndex(
          (stat) => stat.Date === listStat.Date
        );
        if (existingStatIndex !== -1) {
          // 이미 있는 날짜의 데이터를 업데이트합니다.
          existingDocStats[existingStatIndex] = listStat;
        } else {
          // 새로운 날짜의 데이터를 추가합니다.
          existingDocStats.push(listStat);
        }
      });

      // 업데이트된 문서를 저장합니다.
      const updatedDocument = await trading_data.findOneAndUpdate(
        filter,
        {
          $set: {
            Stats: existingDocStats.sort(
              (a, b) => new Date(b.Date) - new Date(a.Date)
            ),
          },
        },
        { new: true }
      );
    } else {
      // 기존 문서가 없으면, 새로운 문서를 삽입합니다.
      const newDocument = await trading_data.create(list);
    }
  }
};
module.exports = loadtrade;

// 필요한거 몽고db items 컬렉션 원소 Id 개수만큼 돌리기
// 결과 trading_data 컬렉션에 저장

//update.js

// const mongoose = require('mongoose');
// const trading_data = require('../model/trading_data');

// mongoose.connect(`mongodb+srv://nakki0404:qwer@cluster0.ttcs9nu.mongodb.net/market_test?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log("MONGO CONNECTION OPEN!!!")
//         fetchDataAndUpdate();
//     })
//     .catch(err => {
//         console.log("OH NO MONGO CONNECTION ERROR!!!!")
//         console.log(err)
//     })

//     async function fetchDataAndUpdate() {
//         try {
//             const importedList = await getPageData();
//             // console.log(importedList);
//             console.log(`Total items: ${importedList.length}`);
//             await trading_data.deleteMany({}); // 기존 데이터 모두 삭제

//             const insertedData = await trading_data.insertMany(importedList);
//             console.log(`Inserted ${insertedData.length} items into MongoDB`);
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     fetchDataAndUpdate();

// module.exports = fetchData;

//   eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAxNDQ2MzkifQ.mYsj_wkn91cxGt1Y2WPyZmJR3rdbu3NwtSg500oj91Su6Quqvn3msXQcD_jPhOThRH_pLKLDT9_Z0c3cqZWZD2p1Uizs9azDWroo3nDXQzjcqLYPNUDGTdnge7QRBSk2iPJuRRyo6n99rMAsD1H7gCtpQF5OCiyUeq3WPv4klovdd0oqpWDf7-0FNUUf-s3NR5qk1guD_f7-lpbZUptq2cwHfsJfH0pX5cnfCG3017Hd30ZaLXJ2M4X3P3vfpUkmEwsIMGcPrQjHGfcIz9kU2rH65ZoowIIwN1tWUAwrXBBvvrTPE2W7V6Mqex-5yiFF5SN9HEVl9d1COQpDrDbngA
