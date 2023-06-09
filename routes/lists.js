var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
require('dotenv').config();

const Schema = mongoose.Schema;

const listSchema = new Schema({ title: String }, { versionKey: false });
const List = mongoose.model("List", listSchema);


router.get('/getAll', async function (req, res, next) {

    try {
        await mongoose.connect(process.env.DB_URL);
    }
    catch (err) {
        return console.log(err);
    }

    const lists = await List.find({});
    res.send(lists);
});

router.delete('/delete', async function (req, res, next) {

    const id = req.body;

    try {
        const mongoClient = new MongoClient(process.env.DB_URL);
        await mongoClient.connect();

        const db = mongoClient.db("boardLikeTrello");
        const collection = db.collection("lists");
        await collection.findOneAndDelete({_id: new mongoose.Types.ObjectId(id._id)});
        console.log(id._id);

    }
    catch (err) {
        return console.log(err);
    }

    res.send(id);
});

router.post('/add', async function (req, res, next) {

    if (!req.body) return res.sendStatus(400);

    const list = req.body;

    try {
        const mongoClient = new MongoClient(process.env.DB_URL);
        await mongoClient.connect();

        const db = mongoClient.db("boardLikeTrello");
        const collection = db.collection("lists");
        await collection.insertOne(list);
    }
    catch (err) {
        return console.log(err);
    }

    const added = await List.find({title: String(list.title)});
    res.send(added);
});


module.exports = router;