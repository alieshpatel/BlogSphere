const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

const blogSchema = new mongoose.Schema({
  title: String,
  descripion: String,
  email: String,
  img: String,
});

const Blog = mongoose.model("Blog", blogSchema);

app.use(express.json());
app.use(cors());

app.listen(3000, async () => {
  console.log("server is started");
  await main();
  console.log("mongo connected");
});

app.get("/", async (req, res) => {
  res.send("welcome to backend of blog-app");
});

// get all blogs
app.get("/allblog", async (req, res) => {
  const allBlog = await Blog.find();
  console.log(allBlog);
  res.json({ allBlog });
});

// get blogs by id
app.get("/blog/:id", async (req, res) => {
  const { id } = req.params;
  const singleBlog = await Blog.findById(id);
  res.json({ singleBlog });
});

//new blog
app.post("/newblog", async (req, res) => {
  const { title, descripion, email, img } = req.body;
  const blog = new Blog({ title, descripion, email, img });
  await blog.save();
  res.json({ msg: "Success blog added!" });
});

//delete blog
app.get("/blog/delete/:id", async (req, res) => {
  const { id } = req.params;
  const deleteBlog = await Blog.deleteOne({ _id: id });
  res.json({ msg: "Delete" });
});

//update blog
app.post("/blog/update", async (req, res) => {
  const { id, title, descripion, email, img } = req.body;
  const updateBlog = await Blog.updateOne(
    { _id: id },
    { title, descripion, email, img },
  );
  res.json({ msg: "Updated" });
});

app.post("/myblog", async (req, res) => {
  const {email} = req.body;
  const myblog = await Blog.find({email})
  // console.log(myblog);
  res.json({myblog})
  
});