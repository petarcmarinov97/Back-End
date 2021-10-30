const router = require('express').Router();
const {isUser, isGuest} = require('../middlewares/guards');

router.get('/create', isUser(), (req, res) => {
    res.render('course/create')
});

router.post('/create', isUser(), async (req, res) => {
    try {

    const courseData = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        isPublic: Boolean(req.body.isPublic),
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

router.get('/details/:id', async(req, res) =>{
    try{
        const course = await req.storage.getCourseById(req.params.id);
        course.hasUser = Boolean(req.user);
        course.isOwner = req.user && req.user._id == course.owner;
        course.isEnrolled = req.user && course.usersEnrolled.find(x => x == req.user._id);
        
        res.render('course/details', { course });
    }catch(err){
        console.log(err.message);
        res.redirect('/404');
    }
});

router.get('/edit/:id', isUser(), async(req, res) =>{
    try{
        const course = await req.storage.getCourseById(req.params.id);

        if(course.owner != req.user._id){
            throw new Error('Cannot edit Course you haven\'t created');
        }
        
        res.render('course/edit', { course });
    }catch(err){
        console.log(err.message);
        res.redirect('/404');
    }
});

router.post('/edit/:id', isUser(), async(req, res) =>{
    try{
        const course = await req.storage.getCourseById(req.params.id);

        if(course.owner != req.user._id){
            throw new Error('Cannot edit Course you haven\'t created');
        }

        await req.storage.editCourse(req.params.id, req.body)

        res.redirect('/');
    }catch(err){
        console.log(err.message);

        let errors;
        if(err.errors) {
            errors = Object.values(err.errors).map( e => e.properties.message)
        }else{
            errors = [err.message];
        }
        const ctx = {
            errors,
            course: {
                _id: req.params.id,
                title: req.body.title,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                isPublic: req.body.isPublic,
            }
        }
        res.render('course/edit', ctx)
    }
});

router.get('/delete/:id', isUser(), async(req, res) => {
    try{
        const course = await req.storage.getCourseById(req.params.id);

        if(course.owner != req.user._id){
            throw new Error('Cannot delete course you haven\'t created');
        }

       await req.storage.deleteCourse(req.params.id);

       res.redirect('/')
    }catch(err){
        console.log(err.message);
        res.redirect('/courses/details/' + req.params.id)
    }
});

router.get('/enroll/:id', isUser(), async(req, res) => {
    try{
        await req.storage.enrollCourse(req.params.id, req.user._id)

        res.redirect('/courses/details/' + req.params.id);
    }catch(err){
        console.log('Error:', err.message);
        res.redirect('/')
    }
})

module.exports = router;