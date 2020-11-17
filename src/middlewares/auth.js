const jwt = require('jsonwebtoken');
const { promisify } = require('util');

/* User model */
const Users = require('../models/Users');

/* Secret */
const { SECRET } = process.env;

module.exports = async (req, res, next) => {
    let { authorization } = req.headers;

    if(!authorization) return res.status(401).json({ message: 'Token not provided!' });

    let [, token] = authorization.split(' ');

    try {
        let { id, isAdmin } = await promisify(jwt.verify)(token, SECRET);
        if(!id || !isAdmin) return res.users.error('unauthorized');

        Users.findById(id).then(users => {
            if(!users) return res.users.error('notFound');
            req.users = { id, isAdmin };
            next();
        }).catch(res.users.error);
    } catch (err) { return res.users.error('unauthorized') };
};