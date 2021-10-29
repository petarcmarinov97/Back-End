const authController = require('../controllers/authController');
const homeController = require('../controllers/homeController');
const courseController = require('../controllers/courseController');

module.exports = (app) => {
    app.use('/', homeController)
    app.use('/auth', authController);
    app.use('/courses', courseController);
};