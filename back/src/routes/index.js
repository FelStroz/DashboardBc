const routes = require('express').Router();


/*
    Routes subgroups
*/
    routes.use('/auth', require('./auth'));
    routes.use('/users', require('./users'));
    routes.use('/bcs', require('./bcs'));

module.exports = routes;