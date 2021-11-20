const {Router} = require('express');
const {Types} = require('mongoose');
const Client = require('../models/client');
const router = Router();

router.get('/', async (req, res) => {
    try {
        const clients = await Client.find().populate('typeId');
        res.status(200).json(clients);
    } catch(e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error'
        })
    }
});

router.post('/list', async (req, res) => {
    try {
        const { query } = req.body;
        const clients = await Client.find({
            "name": new RegExp(query, 'i')
        }).populate('typeId');
        res.status(200).json(clients);
    } catch(e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error'
        })
    }
});


router.post('/',  async (req, res) => {
    const client = new Client({
        name: 'ООО Рога и Копыта',
        typeId: Types.ObjectId('61751b4657f5bd6cd96ec9a2'),
    });

    try {
        const result = await client.save();
        res.status(201).json({result})
    } catch(e) {
        console.log(e)
        res.status(500).json({
            message: 'Server error'
        })
    }
});

module.exports = router;
