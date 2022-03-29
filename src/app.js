const express = require('express');

const app = express();

const profileRouter = require("./routes/profile")

app.use(express.json());

app.get('/', (req,res) => {
    res.status(200)
    res.send("Hello World")
}); 

app.use('/profile', profileRouter)


module.exports = app;