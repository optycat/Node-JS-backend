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

    const users = await List.find({});
    res.send(users);
});

router.delete('/delete', async function (req, res, next) {

    const id = req.body;

    try {
        const mongoClient = new MongoClient("mongodb+srv://admin:admin@clustertest.p5xn7gf.mongodb.net/boardLikeTrello?retryWrites=true&w=majority");
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
        const mongoClient = new MongoClient("mongodb+srv://admin:admin@clustertest.p5xn7gf.mongodb.net/boardLikeTrello?retryWrites=true&w=majority");
        await mongoClient.connect();

        const db = mongoClient.db("boardLikeTrello");
        const collection = db.collection("lists");
        await collection.insertOne(list);
    }
    catch (err) {
        return console.log(err);
    }

    res.send(list);
});


module.exports = router;