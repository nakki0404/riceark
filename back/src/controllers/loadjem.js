// loadMarket.js

const axios = require('axios');

const authorizationToken = process.env.API_KEY

// 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAxNDQ2MzkifQ.mYsj_wkn91cxGt1Y2WPyZmJR3rdbu3NwtSg500oj91Su6Quqvn3msXQcD_jPhOThRH_pLKLDT9_Z0c3cqZWZD2p1Uizs9azDWroo3nDXQzjcqLYPNUDGTdnge7QRBSk2iPJuRRyo6n99rMAsD1H7gCtpQF5OCiyUeq3WPv4klovdd0oqpWDf7-0FNUUf-s3NR5qk1guD_f7-lpbZUptq2cwHfsJfH0pX5cnfCG3017Hd30ZaLXJ2M4X3P3vfpUkmEwsIMGcPrQjHGfcIz9kU2rH65ZoowIIwN1tWUAwrXBBvvrTPE2W7V6Mqex-5yiFF5SN9HEVl9d1COQpDrDbngA'; // JWT 토큰을 여기에 입력

const getPageData = async (pageNo) => {
  const config = {
    method: 'post',
    url: 'https://developer-lostark.game.onstove.com/auctions/items',
    headers: {
      'accept': 'application/json',
      'authorization': `bearer ${authorizationToken}`,
      'content-Type': 'application/json'
    },
    data: {
      "ItemLevelMin": 0,
      "ItemLevelMax": 0,
      "ItemGradeQuality": null,
      "SkillOptions": [
        {
          "FirstOption": null,
          "SecondOption": null,
          "MinValue": null,
          "MaxValue": null
        }
      ],
      "EtcOptions": [
        {
          "FirstOption": null,
          "SecondOption": null,
          "MinValue": null,
          "MaxValue": null
        }
      ],
      "Sort": "BidStart_Price",
      "CategoryCode": 210000,
      "CharacterClass": "",
      "ItemTier": 3,
      "ItemGrade": "",
      "ItemName": "5레벨",
      "PageNo": pageNo,
      "SortCondition": "ASC"
    }
  };

  try {
    const response = await axios(config);
    return response.data.Items;
  } catch (error) {
    console.log(error);
    return [];
  }
};



const loadjem = async () => {
  const promises = [];
  
  for (let pageNo = 0; pageNo <= 10; pageNo++) {
    promises.push(getPageData(pageNo));
  }

  try {
    const resultArrays = await Promise.all(promises);
    const list = resultArrays.flat(); // Flatten the array of arrays
    const newlist=list.map(i=>i.AuctionInfo.BuyPrice);
    const sum=newlist.reduce((total, num) => {
      if (num !== null&&num<3000) {
        return total + num;
      } else {
        return total;
      }
    }, 0);
    // console.log(list[0]);

    function countNonNullElements(arr) {
      let count = 0;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== null&&arr[i]<3000) {
          count++;
        }
      }
      return count;
    }
    
    const nonNullCount = countNonNullElements(newlist);
    const avg=(sum/nonNullCount);

    return avg;    
    
  } catch (error) {
    console.log(error);
    return [];
  }
};


async function jem()
{
  const avg = await loadjem();
  const etc = [
    {
        "Id": 9999999,
        "Name": "골드",
        "Grade": "일반",
        "Icon": "https://cdn-lostark.game.onstove.com/efui_iconatlas/money/money_4.png",
        "BundleCount": 1,
        "TradeRemainCount": null,
        "YDayAvgPrice": 1,
        "RecentPrice": 1,
        "CurrentMinPrice": 1,
        "__v": 0
    }
    ,
    {
        "Id": 9999998,
        "Name": "더보기",
        "Grade": "일반",
        "Icon": "https://cdn-lostark.game.onstove.com/efui_iconatlas/money/money_4.png",
        "BundleCount": 1,
        "TradeRemainCount": null,
        "YDayAvgPrice": -1,
        "RecentPrice": 1,
        "CurrentMinPrice": 1,
        "__v": 0
    }
    ,
    {
        "Id": 9999991,
        "Name": "1레벨 보석",
        "Grade": "일반",
        "Icon": "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_9_46.png",
        "BundleCount": 1,
        "TradeRemainCount": null,
        "YDayAvgPrice": (avg/3/3/3/3).toFixed(1),
        "RecentPrice": 1,
        "CurrentMinPrice": 1,
        "__v": 0
    },
    {
        "Id": 9999992,
        "Name": "2레벨 보석",
        "Grade": "일반",
        "Icon": "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_9_46.png",
        "BundleCount": 1,
        "TradeRemainCount": null,
        "YDayAvgPrice": (avg/3/3/3).toFixed(1),
        "RecentPrice": 1,
        "CurrentMinPrice": 1,
        "__v": 0
    }
    ,
    {
        "Id": 9999993,
        "Name": "3레벨 보석",
        "Grade": "일반",
        "Icon": "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_9_46.png",
        "BundleCount": 1,
        "TradeRemainCount": null,
        "YDayAvgPrice": (avg/3/3).toFixed(1),
        "RecentPrice": 1,
        "CurrentMinPrice": 1,
        "__v": 0
    }
    ,
    {
        "Id": 9999994,
        "Name": "4레벨 보석",
        "Grade": "일반",
        "Icon": "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_9_46.png",
        "BundleCount": 1,
        "TradeRemainCount": null,
        "YDayAvgPrice": (avg/3).toFixed(1),
        "RecentPrice": 1,
        "CurrentMinPrice": 1,
        "__v": 0
    }
    ,
    {
        "Id": 9999995,
        "Name": "5레벨 보석",
        "Grade": "일반",
        "Icon": "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_9_46.png",
        "BundleCount": 1,
        "TradeRemainCount": null,
        "YDayAvgPrice": avg.toFixed(1),
        "RecentPrice": 1,
        "CurrentMinPrice": 1,
        "__v": 0
    }
  ];
  return etc}
  // (async () => {
  //   const etc = await jem();
  //   console.log(etc);
  // })();
module.exports = jem;


//   eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAxNDQ2MzkifQ.mYsj_wkn91cxGt1Y2WPyZmJR3rdbu3NwtSg500oj91Su6Quqvn3msXQcD_jPhOThRH_pLKLDT9_Z0c3cqZWZD2p1Uizs9azDWroo3nDXQzjcqLYPNUDGTdnge7QRBSk2iPJuRRyo6n99rMAsD1H7gCtpQF5OCiyUeq3WPv4klovdd0oqpWDf7-0FNUUf-s3NR5qk1guD_f7-lpbZUptq2cwHfsJfH0pX5cnfCG3017Hd30ZaLXJ2M4X3P3vfpUkmEwsIMGcPrQjHGfcIz9kU2rH65ZoowIIwN1tWUAwrXBBvvrTPE2W7V6Mqex-5yiFF5SN9HEVl9d1COQpDrDbngA