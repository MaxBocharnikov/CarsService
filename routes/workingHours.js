const {Router} = require('express');
const WorkingHour = require('../models/workingHour');
const router = Router();
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
    try {
        const workingHours = await WorkingHour.find();
        res.status(200).json(workingHours);
    } catch(e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error'
        })
    }
});


router.post('/', auth,  async (req, res) => {
    const { title } = req.body;
    const workingHour = new WorkingHour({
        title
    });

    try {
        const result = await workingHour.save();
        res.status(201).json(result)
    } catch(e) {
        console.log(e)
        res.status(500).json({
            message: 'Server error'
        })
    }
});





module.exports = router;
