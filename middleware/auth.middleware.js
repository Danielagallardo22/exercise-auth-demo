const isItLogIn = (req, res, next) => {
    //console.log('hi')
// block the person to go to profile if they are not log in
    if (!req.session.user) {
        res.redirect('/')
        return
    }
    next();
}

const isAnon = (req, res, next) => {
    //console.log('hi')
// block the person to go to profile if they are not log in
    if (req.session.user) {
        res.redirect('/profile')
        return
    }
    next();
}


module.exports = {isItLogIn, isAnon};