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

module.exports = router;