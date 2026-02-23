const express = require("express");
const mongoose = require('mongoose');
const app = express();

app.use(express.json())

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

app.listen(3000, async() => {    
    console.log(`Server is started at port:${3000}`);

    await main();
    console.log("MongoDB Connected");
    
});

const blogSchema = new mongoose.Schema({
  title: String,
  descripion: String,
  email: String,
  img: String
});

const Blog = mongoose.model('Blog', blogSchema);

//home root page
app.get("/", async(req,res) => {
    res.send("Welcome to Blog App!")    
})

// get all blogs
app.get("/blog", async(req,res) => {
    const allBlog = await Blog.find()
    console.log(allBlog);
    res.json({allBlog})

})

// get all blogs by id
app.get("/blog/:id", async(req,res) => {
    const {id} = req.params
    const singleBlog = await Blog.findById(id)
    res.json({singleBlog})
})

//new blog
app.post("/blog", async(req,res) => {
        const {title, descripion, email, img} = req.body
        const blog = new Blog({title, descripion, email, img})
        await blog.save()
        res.json({
            "msg": "Success blog added!"
        })
})

//delete blog 
app.delete("/blog/:id", async (req, res) => {
    const { id } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(id);
    res.json({ msg: "Blog deleted successfully" });
})

//update blog 
app.put("/blog/:id", async (req, res) => {
    const { id } = req.params;
        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            req.body,
            {
                returnDocument: "after",   
                runValidators: true
            }
        );

        res.json({
            msg: "Blog updated successfully", 
        });
})