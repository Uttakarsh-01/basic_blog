const path = require("path");
const express = require("express");
const mongoose = require('mongoose');
const userRoute = require('./routes/user')

const app = express();
const PORT = 8000;

mongoose.connect('mongodb://localhost:27017/blogger').then((e) => console.log('mongodb connected'));

app.set('view engine','ejs')
app.set("views",path.resolve("./views"));

app.get("/",(req,res)=>{
    res.render("home");
})

app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(express.json()); // Parse JSON data

app.use("/user",userRoute);

app.listen(PORT,()=> console.log(`server is started at PORT: ${PORT}`));