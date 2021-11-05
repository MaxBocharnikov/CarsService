const {Router} = require('express');
const {Types} = require('mongoose');
const Client = require('../models/client');
const router = Router();

router.get('/', async (req, res) => {
    try {
        const clients = await Client.find().populate('typeId');
        res.status(200).json({clients});
    } catch(e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error'
        })
    }
});


router.post('/',  async (req, res) => {
    const client = new Client({
        name: 'Test Client',
        typeId: Types.ObjectId('617521da4b5980fff6dba538'),
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
