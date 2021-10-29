const course = require('../services/course');

module.exports = () => (req, res, next) => {
    //TODO import and dec. services
    req.storage = {
        ...course
    };
    next();
}