const express = require('express');
const router = express.Router();

const fileDb = require('../fileDb');

router.post('/', (req, res) => {
    if (!req.body.message) {
        res.status(400).send({"error": "Message must be present in the request"});
    }

    const message = fileDb.addItem({
        message: req.body.message,
        author: req.body.author || 'Anonymous',
    });

    if (req.file) {
        message.image = req.file.filename;
    }

    const newMessage = fileDb.addItem(message);

    res.send(newMessage);

});

module.exports = router;