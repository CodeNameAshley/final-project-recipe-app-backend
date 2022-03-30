const express = require('express');

const app = express();

const profileRouter = require("./routes/profile")
const recipeRouter = require("./routes/recipe")

app.use(express.json());

app.get('/', (req,res) => {
    res.status(200)
    res.send("Hello World")
}); 

app.use('/profile', profileRouter)
app.use('/profile/recipe', recipeRouter)


module.exports = app;