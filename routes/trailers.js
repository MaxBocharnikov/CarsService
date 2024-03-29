const {Router} = require('express');
const {Types} = require('mongoose');
const Trailer = require('../models/trailer');
const router = Router();
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
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

router.post('/list', auth, async (req, res) => {
    try {
        const { query } = req.body;
        const trailers = await Trailer.find({
            $or: [
                {"name": new RegExp(query, 'i')},
                {"vin": new RegExp(query, 'i')},
                {"stateNumber": new RegExp(query, 'i')}
            ]
        });
        res.status(200).json(trailers);
    } catch(e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error'
        })
    }
});


router.post('/', auth, async (req, res) => {
    try {
        const {
            type,
            model,
            vin,
            stateNumber,
            mileage,
            client,
            name,
            contract,
            guaranteeType,
            guaranteeStartDate,
            guaranteeEndDate
        } = req.body;

        const trailer = new Trailer({
            type,
            model,
            vin,
            stateNumber,
            mileage,
            client,
            name,
            contract,
            guaranteeType,
            guaranteeStartDate,
            guaranteeEndDate
        });
        const result = await trailer.save();
        res.status(201).json({result})
    } catch(e) {
        console.log(e)
        res.status(500).json({
            message: 'Server error'
        })
    }
});

router.put('/', auth, async (req, res) => {
    try {
        const trailer = await Trailer.findById(req.body.id);
        if (!trailer) {
            res.status(400).json({message: 'Application not found'});
            return;
        }
        delete req.body._id;
        Object.assign(trailer, req.body);
        await trailer.save();
        res.status(200).json();
    } catch(e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error'
        })
    }
});

module.exports = router;
