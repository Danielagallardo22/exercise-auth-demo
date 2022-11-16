const bcryptjs = require('bcryptjs');
const User = require('../models/user.models')

const signUpGetController = (req, res, next) => {
    res.render('signUp.hbs')
}


const signUpPostController = (req, res, next) => {
    console.log(req.body);

    if (!req.body.email || !req.body.password) {
        res.send('Sorry you forgot an email or password')
        return;
    }

    User.findOne({ email: req.body.email })
        .then(foundUser => {
            if (foundUser) {
                res.send('User already exists');
                return;
            }
            return User.create({
                email: req.body.email,
                //we can add this method here or create a new 'const myhashpassword = bcryptjs.hashSync(req.body.password)' and then {password = myhashpassword}
                password: bcryptjs.hashSync(req.body.password)
            })

        })

        .then(createdUser => {
            console.log('here is the new user', createdUser);
            res.send(createdUser);
        })

        .catch(err => {
            console.log(err);
            res.send(err);
        })
}


const loginGetController = (req, res, next) => {
    res.render('logIn.hbs')
}

const loginPostController = (req, res, next) => {
    res.send('ok')
}

module.exports = {
    signUpGetController,
    signUpPostController,
    loginGetController,
    loginPostController
};
