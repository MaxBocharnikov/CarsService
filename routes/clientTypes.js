const {Router} = require('express');
const ClientType = require('../models/clientType');
const router = Router();

router.get('/', async (req, res) => {
    try {
        const clientTypes = await ClientType.find();
        res.status(200).json({clientTypes});
    } catch(e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error'
        })
    }
});


router.post('/',  async (req, res) => {
    const clientType = new ClientType({
        type: 'физ лицо',
    });

    try {
        const result = await clientType.save();
        res.status(201).json({result})
    } catch(e) {
        console.log(e)
        res.status(500).json({
            message: 'Server error'
        })
    }
});

module.exports = router;
