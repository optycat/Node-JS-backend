var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
require('dotenv').config();

const Schema = mongoose.Schema;

const taskSchema = new Schema({ title: String }, { versionKey: false });
const Task = mongoose.model("Task", taskSchema);


router.get('/getAll', async function (req, res, next) {

    try {
        await mongoose.connect(process.env.DB_URL);
    }
    catch (err) {
        return console.log(err);
    }

    const users = await Task.find({});
    res.send(users);
});

router.delete('/delete', async function (req, res, next) {

    const id = req.body;

    try {
        const mongoClient = new MongoClient("mongodb+srv://admin:admin@clustertest.p5xn7gf.mongodb.net/boardLikeTrello?retryWrites=true&w=majority");
        await mongoClient.connect();

        const db = mongoClient.db("boardLikeTrello");
        const collection = db.collection("tasks");
        await collection.findOneAndDelete({_id: new mongoose.Types.ObjectId(id._id)});

    }
    catch (err) {
        return console.log(err);
    }

    res.send(id);
});

router.post('/add', async function (req, res, next) {

    if (!req.body) return res.sendStatus(400);

    const task = req.body;

    try {
        const mongoClient = new MongoClient("mongodb+srv://admin:admin@clustertest.p5xn7gf.mongodb.net/boardLikeTrello?retryWrites=true&w=majority");
        await mongoClient.connect();

        const db = mongoClient.db("boardLikeTrello");
        const collection = db.collection("tasks");
        await collection.insertOne(task);
    }
    catch (err) {
        return console.log(err);
    }

    res.send(task);
});


module.exports = router;