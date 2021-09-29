const playService = require('../services/play')

module.exports = () => (req, res, next) => {
    //TODO import and dec. services
    req.storage = {
        ...playService
    };

    next();

}