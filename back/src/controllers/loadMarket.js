// loadMarket.js

const axios = require("axios");

const authorizationToken = process.env.API_KEY;

// 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAxNDQ2MzkifQ.mYsj_wkn91cxGt1Y2WPyZmJR3rdbu3NwtSg500oj91Su6Quqvn3msXQcD_jPhOThRH_pLKLDT9_Z0c3cqZWZD2p1Uizs9azDWroo3nDXQzjcqLYPNUDGTdnge7QRBSk2iPJuRRyo6n99rMAsD1H7gCtpQF5OCiyUeq3WPv4klovdd0oqpWDf7-0FNUUf-s3NR5qk1guD_f7-lpbZUptq2cwHfsJfH0pX5cnfCG3017Hd30ZaLXJ2M4X3P3vfpUkmEwsIMGcPrQjHGfcIz9kU2rH65ZoowIIwN1tWUAwrXBBvvrTPE2W7V6Mqex-5yiFF5SN9HEVl9d1COQpDrDbngA'; // JWT 토큰을 여기에 입력

const getPageData = async (pageNo) => {
  const config = {
    method: "post",
    url: "https://developer-lostark.game.onstove.com/markets/items",
    headers: {
      accept: "application/json",
      authorization: `bearer ${authorizationToken}`,
      "content-Type": "application/json",
    },
    data: {
      CategoryCode: 50000,
      PageNo: pageNo,
    },
  };

  try {
    const response = await axios(config);
    return response.data.Items;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const fetchData = async () => {
  const promises = [];

  for (let pageNo = 1; pageNo <= 6; pageNo++) {
    promises.push(getPageData(pageNo));
  }

  try {
    const resultArrays = await Promise.all(promises);
    const list = resultArrays.flat(); // Flatten the array of arrays
    // 배열 객체 원소 네임 파인드 명예의~ 3개 평균가격
    // 리스트에 추가 {같은속성}
    // 전각, 베템, 생활 도구~생산물, 모든템다하까?, >> api 1회 제한

    const condition = [
      "명예의 파편 주머니(소)",
      "명예의 파편 주머니(중)",
      "명예의 파편 주머니(대)",
    ];

    const resultList = list.filter((e) => condition.includes(e.Name));

    let result = 0;
    resultList.map((e) => {
      result += e.YDayAvgPrice;
    });

    const avg = result / 3000;
    const avghonor = {
      Id: 9999990,
      Name: "명예의 파편(낱개)",
      Grade: "일반",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_7_147.png",
      BundleCount: 1,
      TradeRemainCount: null,
      YDayAvgPrice: avg,
      RecentPrice: 1,
      CurrentMinPrice: 1,
    };

    const newList = [...list, avghonor];

    return newList;
  } catch (error) {
    console.log(error);
    return [];
  }
};
module.exports = fetchData;

//   eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAxNDQ2MzkifQ.mYsj_wkn91cxGt1Y2WPyZmJR3rdbu3NwtSg500oj91Su6Quqvn3msXQcD_jPhOThRH_pLKLDT9_Z0c3cqZWZD2p1Uizs9azDWroo3nDXQzjcqLYPNUDGTdnge7QRBSk2iPJuRRyo6n99rMAsD1H7gCtpQF5OCiyUeq3WPv4klovdd0oqpWDf7-0FNUUf-s3NR5qk1guD_f7-lpbZUptq2cwHfsJfH0pX5cnfCG3017Hd30ZaLXJ2M4X3P3vfpUkmEwsIMGcPrQjHGfcIz9kU2rH65ZoowIIwN1tWUAwrXBBvvrTPE2W7V6Mqex-5yiFF5SN9HEVl9d1COQpDrDbngA
