const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// '파괴석 조각' 컬렉션의 스키마 정의
const trading_dataSchema = new Schema({
  Name: {
    type: String,
    // required: true,
  },
  TradeRemainCount: {
    type: Number,
    default: null, // TradeRemainCount가 주어지지 않은 경우 기본값으로 null 설정
  },
  BundleCount: {
    type: Number,
    // required: true,
  },
  Stats: {
    type: [Object], // Stats는 객체의 배열로 구성된다고 가정합니다.
  },
});

// '파괴석 조각' 컬렉션을 생성
const trading_data = mongoose.model('trading_data', trading_dataSchema);

module.exports = trading_data;

