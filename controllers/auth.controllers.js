const bcryptjs = require('bcryptjs');
const User = require('../models/user.models')

const signUpGetController = (req, res, next) => {
    res.render('signUp.hbs')
}

// controller for sign up page
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

//post controller for log in page 

const loginPostController = (req, res, next) => {
console.log(req.body);

    if (!req.body.email || !req.body.password) {
        res.render('logIn.hbs', {errorMessage: "Sorry you are missing the email or password"})
        return;
    }

    User.findOne({ email: req.body.email })
        .then(foundUser => {
            if (!foundUser) {
                // res.send('user or password doesnt exists')
                res.render('logIn.hbs', {errorMessage: 'Sorry user doesnt exists'})
                return;
            }

            const isValidPassword = bcryptjs.compareSync(req.body.password, foundUser.password)

            if(!isValidPassword){
                // res.send("sorry, wrong password")

                res.render('logIn.hbs', {errorMessage: 'Sorry wrong password'})
                return
            }

            req.session.user = foundUser;

            res.redirect('/profile');
        })

        .catch(err => {
            console.log(err);
            res.send(err)
        })

}


const profileGetControllers = (req, res, next ) => {
    res.render('profile.hbs', req.session.user)
}


module.exports = {
    signUpGetController,
    signUpPostController,
    loginGetController,
    loginPostController,
    profileGetControllers
};
