const mongoose = require('mongoose');

const Users = require('./Users');

const BcSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    reason: {
        type: String,
        required: false,
        default: 'Se fodeu que nem um trouxa'
    },
    isPaid: {
        type: Boolean,
        required: false,
        default: false
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Users'
    }
}, { timestamps: true });

BcSchema.pre('save', async function (next) {
    let { _id: id, user: userId } = this;

    await Users.findByIdAndUpdate(userId, { '$push': { 'bcs': id } }).catch(e => next(e));

    next();
});

module.exports = mongoose.model('Bcs', BcSchema);