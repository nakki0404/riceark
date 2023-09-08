const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  Name: String,
  TTL: {
    type: Date,
    expires: "1d", // 1일 후에 자동으로 삭제
    default: Date.now,
  },
});

const Visitor = mongoose.model("visitor", visitorSchema);
Visitor.collection.createIndex({ expiresTime: 1 }, { expireAfterSeconds: 0 });

module.exports = Visitor;
