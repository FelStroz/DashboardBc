const labels = require('../labels/index');

function error(res) {
    return (err = {}) => {
        if (err.errors) {
            let keys = Object.keys(err.errors);
            let errors = keys.map(key => err.errors[key]);
            res.status(400).json({message: errors[0].message, errors})
        } else if (err.toString() === "TypeError: Cannot destructure property '_id' of 'object null' as it is null." || err === 'notFound' || (err.reason && err.reason.toString() === 'Error: Argument passed in must be a single String of 12 bytes or a string of 24 hex characters'))
            res.status(404).json({message: labels['ptBR'].notFoundBc});
        else if (labels['ptBR'][err.key])
            res.status(err.status).json({message: labels['ptBR'][err.key]});
        else if(err === 'unauthorized')
            res.status(401).json({message: labels['ptBR'].unauthorized});
        else
            res.status(500).json({message: labels['ptBR'].error});
    }
}

function one(bc) {
    let { _id: id, user, reason, isPaid, createdBy, createdAt, updatedAt } = bc;
    return { data: { id, user, reason, isPaid, createdBy, createdAt, updatedAt } };
}

function many({ data, total }) {
    return {
        data: data.map(bc => one(bc).data),
        total
    }
}


module.exports = (req, res, next) => {

    res.bcs = {
        one,
        error: error(res),
        created: (bc) => res.status(201).json(one(bc)),
        show: (bc) => res.status(200).json(one(bc)),
        many: (data) => res.status(200).json(many(data))
    }

    next();
}