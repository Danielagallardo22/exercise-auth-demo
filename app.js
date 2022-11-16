const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

//connect one route to here 
const authRouter = require('./routes/auth.route')

const app = express();

mongoose.connect('mongodb://localhost:27017/exercise-demo')
    .then(x => console.log(`connected to db ${x.connections[0].name}`))
    .catch(err => console.log(err))

const hbs = require('hbs');

app.set('views', __dirname + '/views')
app.set('view engine', 'hbs');


// app.use((req, res, next) => {
//     console.log('hi')
//     next();
// })

//this is for session and mongo connect
app.use(
    session({
        secret: 'keyboardcat',
        resave: true,
        saveUninitialized: false,
        cookie: {
            sameSite: 'lax',
            secure: false,
            httpOnly: true,
            maxAge: 600000 // 60 * 1000 ms === 1 min / 6000000 10min
        },
        store: MongoStore.create({
            mongoUrl: 'mongodb://localhost:27017/exercise-demo'
     
            // ttl => time to live
            // ttl: 60 * 60 * 24 // 60sec * 60min * 24h => 1 day
          })
    })
);

// this is creating the req.body
app.use(express.urlencoded({ extended: false }));

app.use('/', authRouter)

app.get('/', (req, res, next) => {
    res.render('index.hbs');
})




app.listen(3000, () => console.log('App is running on port 3000'))