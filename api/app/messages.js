const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');

const config = require('../config');
const fileDb = require('../fileDb');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.post('/', upload.single('image'), (req, res) => {
    if (!req.body.message) {
        res.status(400).send({"error": "Message must be present in the request"});
    }

    const message = {
        message: req.body.message,
        author: req.body.author || 'Anonymous',
    };

    if (req.file) {
        message.image = req.file.filename;
    }

    const newMessage = fileDb.addItem(message);

    res.send(newMessage);

});

router.get('/', (req, res) => {
    let messages;

    if (req.query.datetime) {
        const date = new Date(req.query.datetime);

        if (isNaN(date.getDate())) {
            res.status(400).send({"error": "Invalid date"});
        } else {
            messages = fileDb.getItemsSinceDatetime(req.query.datetime);
        }
    } else {
        messages = fileDb.getItems(30);
    }

    res.send(messages);
});

module.exports = router;