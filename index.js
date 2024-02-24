//We have to add storage and then do some css style


import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import  {fileURLToPath} from "url";
import fs from "fs"
import ejs from "ejs"

const __dirname = dirname(fileURLToPath(import.meta.url));

const app =express();
const port = 3000;


app.set('view engine', 'ejs');  
app.use(express.static('public')); 
app.use(express.urlencoded({ extended: true })); // For form data

// Placeholder Data (We'll improve this later)
let posts = [];

app.get('/', (req, res) => {
    res.render(__dirname+'/views/home_page.ejs', { posts });
});
app.get('/create', (req, res) => {
  res.render('create_post'); // Render the  create_post.ejs view 
});
app.post('/create',(req,res)=>{
  
  const newPost = {
    title:req.body.title,
    body: req.body.body,
  };
  posts.push(newPost);
  res.redirect('/');
})

app.get("/edit/:index",(req,res)=>{
  const postIndex = req.params.index;
  if (postIndex >=0 && postIndex < posts.length){
    res.render("edit_post",{post: posts[postIndex], index:postIndex} );
  } else {
    res.status(404).send("Post not found");
  }
});

app.get("/delete/:index", (req,res)=>{
  const postIndex = req.params.index;
  if (postIndex>=0 && postIndex < posts.length){
    posts.splice(postIndex,1);
    res.redirect('/');
  }else{
    res.status(404).send('Post not found');
  }
  
})

app.post("/update/:index",(req,res)=>{
  const postIndex = req.params.index;
  if (postIndex>=0 && postIndex < posts.length){
    posts[postIndex].title = req.body.title;
    posts[postIndex].body = req.body.body;
    res.redirect('/');

  }else{
    res.status(404).send('Post not found');
  }
})

app.listen(port, () => console.log(`Listening on port ${port}`));