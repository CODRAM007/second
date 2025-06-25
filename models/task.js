const mongoose = require("mongoose");

const taskSchema = {
  title: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low"
  }
};

module.exports = mongoose.model("Task", taskSchema);
