const Bcs = require('../models/Bcs');
const Users = require('../models/Users');

/* Generic list */
const List = require('../repositories/list');

module.exports = {
    create: async (req, res) => {
        let data = { user, reason, isPaid } = req.body;
        data = { ...data, createdBy: req.users.id };
        let bc = new Bcs(data);
        bc.save().then(res.bcs.created).catch(res.bcs.error);
    },
    getOne: async (req, res) => {
        Bcs.findById(req.params.id).then(bc => {
            if(!bc) return res.error('notFound');
            res.bcs.show(bc);
        }).catch(res.bcs.error);
    },
    delete: async (req, res) => {
        Bcs.findByIdAndDelete(req.params.id).then(async bc => {
            if(!bc) return res.bcs.error('notFound');
            await Users.findByIdAndUpdate(bc.user, { '$pull': { 'bcs': bc._id } }).catch();
            res.bcs.show(bc);
        }).catch(res.bcs.error);
    }
};