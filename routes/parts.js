const {Router} = require('express');
const Part = require('../models/part');
const router = Router();

router.get('/', async (req, res) => {
    try {
        const parts = await Part.find();
        res.status(200).json(parts);
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
        const parts = await Part.find({
            $or: [
                {"name": new RegExp(query, 'i')},
                {"number": new RegExp(query, 'i')}
            ],
        });
        res.status(200).json(parts);
    } catch(e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error'
        })
    }
});

router.post('/',  async (req, res) => {
    const part = new Part({
        number: '12045',
        name: 'Катушка',
        price: 2500,
        quantity: 12,
    });

    try {
        const result = await part.save();
        res.status(201).json({result})
    } catch(e) {
        console.log(e)
        res.status(500).json({
            message: 'Server error'
        })
    }
});

module.exports = router;
