const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  Id: Number,
  Name: String,
  Grade: String,
  Icon: String,
  BundleCount: Number,
  TradeRemainCount: Number,
  YDayAvgPrice: Number,
  RecentPrice: Number,
  CurrentMinPrice: Number,
  Quantity: Number,
}, { _id: false }); // _id 필드 사용 안 함

const MarketSchema = new mongoose.Schema({
  _id: String, // UUID 형식 문자열을 사용할 것으로 추정
  Title: String,
  List: [ItemSchema], // List는 ItemSchema의 배열
  Value: String,
  Pop: Number,
});

const MarketItem = mongoose.model('MarketItem', MarketSchema);

module.exports = MarketItem;
