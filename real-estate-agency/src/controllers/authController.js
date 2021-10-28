const router = require('express').Router();

const { isAuth, isGuest } =require('../middlewares/authMiddleware');
const authService = require('../services/authService');
const { AUTH_COOKIE_NAME } = require('../constants')

router.get('/login', isGuest, ( req, res ) => {
    res.render('auth/login');
})

router.get('/register', isGuest, ( req, res ) => {
    res.render('auth/register');
})

router.post('/login', isGuest, async (req, res ) => {
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

router.post('/register', isGuest, async (req, res ) => {
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

router.get('/logout', isAuth, ( req, res ) => {
    res.clearCookie(AUTH_COOKIE_NAME);
    
    res.redirect('/');
})

module.exports = router;