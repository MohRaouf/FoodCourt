const Store = require("../models/store");

exports.create = (req, res) => {
    Store.create(req.body).then(() => res.status(201).end()).catch((err) => (err.code === 11000) ? res.status(409).end() : res.status(400).end());
}

exports.read = (req, res) => {
    Store.find(req.params.id).then(result => result ? res.json(result) : res.status(404).end())
        .catch(() => res.status(400).end());
}

exports.readAll = async(req, res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const filter = req.query.filter;
    try {
        const count = await Store.countDocuments({});
        const stores = await Store.find(filter ? ({ storeName: { $regex: filter, $options: "i" } }) : {}).skip(limit * (page - 1)).limit(limit);
        res.json({ stores, count });
    } catch (err) { res.status(400).end(); }
}

exports.update = (req, res) => {
    Store.updateOne({ _id: req.params.id }, req.body).then(() => res.status(202).end()).catch((err) => (err.code === 11000) ? res.status(409).end() : res.status(400).end());
}

exports.remove = (req, res) => {
    Store.deleteOne({ _id: req.params.id }).then(() => res.status(202).end()).catch(() => res.status(400).end());
}