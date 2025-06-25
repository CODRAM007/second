const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Task = require("./models/task");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

// MongoDB Atlas connection
mongoose.connect("mongodb+srv://sanojsingh013:S12no908mon@test-pro-db.xlv8jho.mongodb.net/?retryWrites=true&w=majority&appName=test-pro-db")
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(4000, () => {
      console.log("🚀 Server running on port 4000");
    });
  })
  .catch(err => {
    console.error("❌ MongoDB connection error: ", err);
  });

// Home Route
app.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.render("index", { tasks });
});

// Add Task
app.post("/add", async (req, res) => {
  const { title, priority } = req.body;
  if (!title) {
    return res.send("<script>alert('Task title cannot be empty!'); window.location.href='/'</script>");
  }
  await Task.create({ title, priority });
  res.redirect("/");
});

// Delete Task
app.delete("/delete/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

// Update Task
app.put("/edit/:id", async (req, res) => {
  const { title, priority } = req.body;
  if (!title) {
    return res.send("<script>alert('Task title cannot be empty!'); window.location.href='/'</script>");
  }
  await Task.findByIdAndUpdate(req.params.id, { title, priority });
   res.send("<script>alert('Task updated successfully!'); window.location.href='/'</script>");

});

