const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Users = require('../models/Users');

/* Generic list */
const List = require('../repositories/list');

module.exports = {
    create: async (req, res) => {
        let user = new Users({ name, email, password, isAdmin } = req.body);
        user.save().then(res.users.created).catch(res.users.error);
    },
    getOne: async (req, res) => {
        Users.findById(req.params.id).populate('bcs').then(user => {
            if(!user) return res.users.error('notFound');
            res.users.show(user);
        }).catch(res.users.error);
    },
    getMany: async (req, res) => {
        List(Users, req.params).then(res.users.many).catch(res.users.error);
    },
    update: async (req, res) => {
        Users.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).then(user => {
            if(!user) return res.users.error('notFound');
            res.users.show(user);
        }).catch(res.users.error);
    },
    delete: async (req, res) => {
        Users.findByIdAndDelete(req.params.id).then(user => {
            if(!user) return res.users.error('notFound');
            res.users.show(user);
        }).catch(res.users.error);
    },

    login: async (req, res) => {
        let { email, password } = req.body;
        if(!email || !password) return res.users.error('unauthorized');

        Users.findOne({ '$or': [{ 'email': email }, { 'name': email }] }).then(async user => {
            if(!user) return res.users.error('notFound');
            if(!await bcrypt.compare(password, user.password)) return res.users.error({ status: 401, key: 'incorrectPassword' });
            return res.users.login({
                user,
                token: jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRET)
            })
        }).catch(res.users.error);
    }
};
