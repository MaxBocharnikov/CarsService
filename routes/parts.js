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
    try {
        const {
            name,
            number,
            prefix,
            price,
            markUp,
            retailPrice,
            category,
            measure,
            quantity,
         } = req.body;

        const part = new Part({
            name,
            number,
            prefix,
            price,
            markUp,
            retailPrice,
            category,
            measure,
            quantity,
            reserved: 0,
        });
        const result = await part.save();
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
        const part = await Part.findById(req.body.id);
        if (!part) {
            res.status(400).json({message: 'Part not found'});
            return;
        }
        delete req.body._id;
        Object.assign(part, {...req.body, reserved: req.body.reserved === 0
            ? 0
            : req.body.reserved + part.reserved});
        await part.save();
        res.status(200).json();
    } catch(e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error'
        })
    }
});

module.exports = router;
