const express = require('express')
const authRoute = require('./routes/auth.route')
const mongoose = require('mongoose')
const path = require('path')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

mongoose.connect('mongodb://127.0.0.1:27017/auth').then(
  console.log('connected')
)
app.use(authRoute)

app.listen(3001,()=>{
   console.log('listening on 3001 port')
})