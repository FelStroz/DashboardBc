const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: false,
        default: false
    },
    bcs: [{
        type: mongoose.Types.ObjectId,
        ref: 'Bcs'
    }]
    
}, { timestamps: true });

UserSchema.index({ email: 1, name: 1 }, { unique: true });

UserSchema.pre('save', async function (next) {
    let { password } = this;
    this.password = await bcrypt.hash(password, 10).catch(e => next(e));

    next();
});

UserSchema.pre('findOneAndUpdate', async function (next) {
    let { password } = this._update;

    if(password) this._update.password = await bcrypt.hash(password, 10).catch(e => next(e));

    next();
});

UserSchema.pre('findOneAndDelete', async function (next) {
    
});

module.exports = mongoose.model('Users', UserSchema);