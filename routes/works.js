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
    try {
        const {
            name,
            shortName,
            number,
            time,
        } = req.body;
        const work = new Work({
            name,
            shortName,
            number,
            time,
        });
        const result = await work.save();
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
        const work = await Work.findById(req.body.id);
        if (!work) {
            res.status(400).json({message: 'Work not found'});
            return;
        }
        delete req.body._id;
        Object.assign(work, req.body);
        await work.save();
        res.status(200).json();
    } catch(e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error'
        })
    }
});

module.exports = router;
