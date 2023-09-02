//update.js

const mongoose = require('mongoose');
const marketList = require('../model/market');
const fetchData = require('./loadMarket');
const jem = require('./loadjem'); // 파일 경로에 맞게 수정
const loadtrade = require('./loadtrade');

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ttcs9nu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
        fetchDataAndUpdate();
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

    async function fetchDataAndUpdate() {
        try {
            const importedList = await fetchData();
            // console.log(importedList);
            console.log(`Total items: ${importedList.length}`);
    
            const jemData = await jem(); // jem 함수 호출
            // console.log(jemData); // jem 함수가 반환한 객체 출력

            const combinedList = [...importedList, ...jemData]; // 두 배열 합치기
            await marketList.deleteMany({}); // 기존 데이터 모두 삭제
    
            const insertedData = await marketList.insertMany(combinedList);
            console.log(`Inserted ${insertedData.length} items into MongoDB`);
            loadtrade();
        } catch (error) {
            console.log(error);
        }
    }

module.exports={
    fetchDataAndUpdate:fetchDataAndUpdate,
}
