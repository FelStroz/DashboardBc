const routes = require('express').Router();

const users = require('./users');
const bcs = require('./bcs');

routes.use(bcs);
routes.use(users);

module.exports = routes;