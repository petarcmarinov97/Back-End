const router = require('express').Router();
const {isUser} = require('../middlewares/guards');

router.get('/create', isUser(), (req, res) => {
    res.render('course/create')
});

router.post('/create', isUser(), async (req, res) => {
    try {

    const courseData = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        isPublic: req.body.isPublic,
        owner: req.user._id,
    };

        await req.storage.createCourse(courseData);
        
        res.redirect('/');
    } catch (err) {
        console.log(err.message);

        let errors;
        if (err.errors) {
            errors = Object.values(err.errors).map(e => e.properties.message);
        } else {
            errors = [err.message];
        }

        const ctx = {
            errors,
            courseData: {
                title: req.body.title,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                isPublic: req.body.isPublic,
            }
        };

        res.render('course/create', ctx)
    };

});

module.exports = router;