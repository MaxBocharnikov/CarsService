const {Router} = require('express');
const Work = require('../models/work');
const router = Router();

router.get('/', async (req, res) => {
    try {
        const works = await Work.find();
        res.status(200).json(works);
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
        const works = await Work.find({
            $or: [
                {"name": new RegExp(query, 'i')},
                {"number": new RegExp(query, 'i')}
            ],
        });
        res.status(200).json(works);
    } catch(e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error'
        })
    }
});

router.post('/',  async (req, res) => {
    const work = new Work({
        name: 'Считывание кодов на исправление',
        time: 1,
    });

    try {
        const result = await work.save();
        res.status(201).json({result})
    } catch(e) {
        console.log(e)
        res.status(500).json({
            message: 'Server error'
        })
    }
});

module.exports = router;
