const routes = require('express').Router();

const controller = require('../controllers/users');

/*
    Routes
*/

routes.post('/', controller.login);

module.exports = routes;