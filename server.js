const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

async function main() {
  await mongoose.connect("mongodb+srv://parekhyash1103_db_user:Yash-Parekh-1103@cluster0.6thw74j.mongodb.net/?appName=Cluster0");
}

//schema definition
const blogSchema = new mongoose.Schema({
  title: String,
  descripion: String,
  email: String,
  img: String,
});

const Blog = mongoose.model("Blog", blogSchema);

app.use(express.json());
app.use(cors());

//server setup
app.listen(3000, async () => {
  await main();
});

//root page
app.get("/", async (req, res) => {
  res.send("welcome to backend of blog-app");
});

//get all blogs
app.get("/allblog", async (req, res) => {
  const allBlog = await Blog.find();
  res.json({ allBlog });
});

//get blogs by id
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

//my blog 
app.post("/myblog", async (req, res) => {
  const {email} = req.body;
  const myblog = await Blog.find({email})
  res.json({myblog})
  
});