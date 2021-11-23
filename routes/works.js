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

router.post('/',  async (req, res) => {
    const work = new Work({
        number: '123',
        name: 'Test Work 1',
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
