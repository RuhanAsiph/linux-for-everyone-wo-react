const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");



//initialize config file 
dotenv.config({path: './config.env'})


app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads
//serve static files 
app.use(express.static(`${__dirname}/frontend`));



const DB = process.env.DATABASE.replace(
    '<PASSWORD>', 
    process.env.DATABASE_PASSWORD
);


//mopngoose 
mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true}).then(con => {
    console.log('db con successful');
});

//create schema 
const productsSchema = {
    name: String,
    number: String,
    email: String
}

//create model 
const Product = mongoose.model("Product", productsSchema);


app.get('/', (req,res) => {
    res.sendFile(__dirname + "/frontend/index.html");
});

//app.post 
app.post('/', (req, res) => {
    let newProd = new Product({
        name: req.body.name,
        number: req.body.number,
        email: req.body.email
    })
    newProd.save();
    res.redirect('/');
});

app.listen(3000, function(){
    console.log('server started @ port 3000');
});
