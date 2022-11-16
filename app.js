const express = require('express');
const mongoose = require('mongoose');

//connect one route to here 
const authRouter = require('./routes/auth.route')

const app = express();

mongoose.connect('mongodb://localhost:27017/exercise-demo')
    .then(x => console.log(`connected to db ${x.connections[0].name}`))
    .catch(err => console.log(err))

const hbs = require('hbs');

app.set('views', __dirname + '/views')
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: false }));

app.use('/', authRouter)

app.get('/', (req, res, next) => {
    res.render('index.hbs');
})


app.listen(3000, () => console.log('App is running on port 3000'))