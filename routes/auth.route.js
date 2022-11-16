const router = require('express').Router();

const { signUpGetController, signUpPostController, loginGetController, loginPostController} = require('../controllers/auth.controllers')


router.get('/signUp', signUpGetController)

// post requested and created our sing up 

router.post('/singUp', signUpPostController)


router.get('/logIn', loginGetController)

router.post('/logIn', loginPostController)


module.exports = router;