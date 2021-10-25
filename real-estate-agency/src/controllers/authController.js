const router = require('express').Router();

const authService = require('../services/authService');

router.get('/login', ( req, res ) => {
    res.render('auth/login');
})

router.get('/register', ( req, res ) => {
    res.render('auth/register');
})

router.post('/login', async (req, res ) => {
    const { username, password } = req.body;

    try {
        await authService.login({
            username,
            password,
        });
    
        res.redirect('/');
    } catch (error) {
        
    }
    
})

router.post('/register', async (req, res ) => {
    const { name, username, password, rePassword } = req.body;

    if( password !== rePassword){
        res.locals.error = 'Password missmatch';

        return res.render('auth/register');
    }

    try {
        await authService.register({
            name,
            username,
            password,
        });

        res.redirect('/');

    } catch (error) {
        //TODO : return error response
    }
    

})

module.exports = router;