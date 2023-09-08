const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  Title: String,
  Body: String,
});

const Report = mongoose.model("Report", ReportSchema);

module.exports = Report;
