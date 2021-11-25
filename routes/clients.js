const {Router} = require('express');
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
        })
        res.status(200).json(clients);
    } catch(e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error'
        })
    }
});


router.post('/',  async (req, res) => {
    try {
        const {
            type,
            name,
            address,
            legalAddress,
            inn,
            kpp,
            ogrn,
            carInfo,
            contactInfo,
        } = req.body;

        const client = new Client({
            type,
            name,
            address,
            legalAddress,
            inn,
            kpp,
            ogrn,
            carInfo,
            contactInfo,
        });

        const result = await client.save();
        res.status(201).json({result})
    } catch(e) {
        console.log(e)
        res.status(500).json({
            message: 'Server error'
        })
    }
});

router.put('/', async (req, res) => {
    try {
        const client = await Client.findById(req.body.id);
        if (!client) {
            res.status(400).json({message: 'Application not found'});
            return;
        }
        delete req.body._id;
        Object.assign(client, req.body);
        await client.save();
        res.status(200).json();
    } catch(e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error'
        })
    }
});

module.exports = router;
