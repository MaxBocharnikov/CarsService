const {Router} = require('express');
const {Types} = require('mongoose');
const Trailer = require('../models/trailer');
const router = Router();

router.get('/', async (req, res) => {
    try {
        const trailers = await Trailer.find().populate('clientId');
        res.status(200).json({trailers});
    } catch(e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error'
        })
    }
});


router.post('/',  async (req, res) => {
    const trailer = new Trailer({
        model: 'Test Model',
        clientId: Types.ObjectId('617521da4b5980fff6dba538'),
    });

    try {
        const result = await trailer.save();
        res.status(201).json({result})
    } catch(e) {
        console.log(e)
        res.status(500).json({
            message: 'Server error'
        })
    }
});

module.exports = router;
