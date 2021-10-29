const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { isGuest } = require('../middlewares/guards');

router.get('/register', isGuest(), (req, res) => {
    res.render('user/register');
});


router.post(
    //Прилагат се съобщения за грешки, които да хвърля на сървъра
    '/register',
    isGuest(),
    body('username')
    .isLength({min: 3}).withMessage('Username must be at least 5 characters long which could be english letters and digits!')
    .bail()
    .isAlphanumeric(),
    body('password').trim()
    .isLength({ min: 5 }).withMessage('Password must be at least 5 characters long which could be english letters and digits!').bail()
    .matches(/[a-zA-z0-9]/),
    body('rePass').custom((value, { req }) => {
        if (value != req.body.password) {
            throw new Error('Passwords have to match');
        }
        return true;
    }),
    async (req, res) => {
            const { errors } = validationResult(req);

        try{
            if (errors.length > 0) {
                const message = errors.map(e => e.msg).join('\n');
                throw new Error(message);
            }
            await req.auth.register(req.body.username, req.body.password);

            res.redirect('/');
        } catch (err) {
            //Пазя съобщения за грешка в контекста
            console.log(err.message);
            const ctx = {
                errors: err.message.split('\n'),
                userData:{
                    username: req.body.username,
                }
            }
            res.render('user/register', ctx);
            };
        });

router.get('/login', isGuest(), (req, res) => {
    res.render('user/login');
});

router.post('/login', isGuest(), async (req,  res) => {
    try{
        await req.auth.login(req.body.username, req.body.password)
        res.redirect('/'); //TODO change redirect location
    }catch(err){
        console.log(err.message);
        //Пазя съобщения за грешка в контекста
            const ctx = {
                errors:[err.message],
                userData:{
                    username: req.body.username
                }
    };
    res.render('user/login',ctx);
    }
});

router.get('/logout', (req,res)=>{
    req.auth.logout();
    res.redirect('/');
});

module.exports = router;