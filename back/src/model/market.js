//market.js

const mongoose = require('mongoose');

const marketListSchema = new mongoose.Schema({
  Id: Number,
  Name: String,
  Grade: String,
  Icon: String,
  BundleCount: Number,
  TradeRemainCount: Number,  // 또는 null 허용하려면 { type: Number, default: null }로 설정
  YDayAvgPrice: Number,
  RecentPrice: Number,
  CurrentMinPrice: Number
});

const marketList = mongoose.model('Item', marketListSchema);

module.exports = marketList;
