const hotel = require('../services/hotel');

module.exports = () => (req, res, next) => {
    //TODO import and dec. services
    req.storage = {
        //Начин да достъпваме по-късно всички функционалности на hotel.js
        ...hotel
    };

    next();
};