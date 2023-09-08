const mongoose = require("mongoose");

const preventSchema = new mongoose.Schema({
  Num: String,
  expiresTime: {
    type: Date,
    expires: "5m",
    default: Date.now,
  },
});

const Prevent = mongoose.model("prevent", preventSchema);
Prevent.collection.createIndex({ expiresTime: 1 }, { expireAfterSeconds: 0 });

module.exports = Prevent;
