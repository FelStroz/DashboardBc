const labels = require('../labels/index');

function error(res) {
    return (err = {}) => {
        if (err.code === 11000)
            res.status(400).json({message: labels['ptBR'].userExists});
        else if (err.errors) {
            let keys = Object.keys(err.errors);
            let errors = keys.map(key => err.errors[key]);
            res.status(400).json({message: errors[0].message, errors})
        } else if (err.toString() === "TypeError: Cannot destructure property '_id' of 'object null' as it is null." || err === 'notFound' || (err.reason && err.reason.toString() === 'Error: Argument passed in must be a single String of 12 bytes or a string of 24 hex characters'))
            res.status(404).json({message: labels['ptBR'].notFoundUser});
        else if (labels['ptBR'][err.key])
            res.status(err.status).json({message: labels['ptBR'][err.key]});
        else if(err === 'unauthorized')
            res.status(401).json({message: labels['ptBR'].unauthorized});
        else
            res.status(500).json({message: labels['ptBR'].error});
    };
}

function one(user, bcOne) {
    let { _id: id, name, email, isAdmin, bcs, createdAt, updatedAt } = user;
    if (bcOne) bcs = bcs.map(bc => bcOne(bc).data);
    return { data: { id, name, email, isAdmin, bcs, bcsCount: bcs.length, createdAt, updatedAt } };
}

function many({ data, total }) {
    return {
        data: data.map(user => one(user).data),
        total
    }
}

function login({ user, token }) {
    return {
        user: one(user),
        token
    }
}


module.exports = (req, res, next) => {
    
    res.users = {
        error: error(res),
        created: (user) => res.status(201).json(one(user)),
        show: (user) => res.status(200).json(one(user, res.bcs.one)),
        many: (data) => res.status(200).json(many(data)),
        login: data => res.status(200).json(login(data))
    }

    next();
}