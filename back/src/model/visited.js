const mongoose = require("mongoose");

const visitedSchema = new mongoose.Schema({
  Date: String,
  todayTotal: Number,
});

const Visited = mongoose.model("visited", visitedSchema);

module.exports = Visited;
