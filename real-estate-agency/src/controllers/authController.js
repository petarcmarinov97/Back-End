const router = require('express').Router();

const authService = require('../services/authService');
const { AUTH_COOKIE_NAME } = require('../constants')

router.get('/login', ( req, res ) => {
    res.render('auth/login');
})

router.get('/register', ( req, res ) => {
    res.render('auth/register');
})

router.post('/login', async (req, res ) => {
    const { username, password } = req.body;

    try {
       let token = await authService.login({
            username,
            password,
        });

        //TODO: Set token in httpOnly cookie
        res.cookie(AUTH_COOKIE_NAME, token);

        res.redirect('/');
    } catch (error) {
        console.log(error);
        //TODO: Return proper notification
        res.end();
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

        //Start: If we needs to be login after the registration form submit
        let token = await authService.login({
            username,
            password
        })

        res.cookie(AUTH_COOKIE_NAME, token);

        //End
        res.redirect('/');

    } catch (error) {
        //TODO : return error response
    }
    

})

module.exports = router;