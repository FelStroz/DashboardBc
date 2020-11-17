
module.exports = async (Model, queryData = {}, qFieldDefault = 'name') => {
    let { page, perPage, field, sort, q, qField } = queryData;

    let query = q ? {
        [qField || qFieldDefault]: {
            $regex: q,
            $options: "i"
        }
    }: {};

    if (!page) page = 1;
    if (!perPage) perPage = 0;
    if (!field) field = qFieldDefault;

    let total = await Model.countDocuments(query).catch(err => Promise.reject(err));
    let data = await Model.find(query).limit(parseInt(perPage)).skip(perPage * (page - 1)).sort({[field]: sort}).catch(err => Promise.reject(err));

    return { data, total };
};