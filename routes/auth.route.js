const router = require('express').Router();

const {
    signUpGetController,
    signUpPostController,
    loginGetController,
    loginPostController,
    profileGetControllers
} = require('../controllers/auth.controllers');

const { isItLogIn, isAnon } = require('../middleware/auth.middleware.js');


router.get('/signUp', isAnon, signUpGetController)

// post requested and created our sing up 

router.post('/singUp', isAnon, signUpPostController)


router.get('/logIn', isAnon, loginGetController)

router.post('/logIn', isAnon, loginPostController)

router.get('/profile', isItLogIn, profileGetControllers)

router.get('/logout', (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
});

module.exports = router;