const router = require('express').Router();

router.get('/', async (req, res) => {
    const courses = await req.storage.getAllCourses();
    res.render('home/home', { courses });
});

module.exports = router;