const {Router} = require('express');
const {Types} = require('mongoose');
const Application = require('../models/application');
const router = Router();

router.get('/', async (req, res) => {
    try {
        const applications = await Application.find();
        res.status(200).json({applications});
    } catch(e) {
        console.log(e);
    res.status(500).json({
        message: 'Server error'
    })
    }
});

router.get('/:id', async (req, res) => {
    try {
        const application = await Application
            .findById(req.params.id)
            .populate('clientId')
            .populate('trailersIds')
            .populate('worksIds')
            .populate('partsIds')
            .exec();
        res.status(200).json({application});
    } catch(e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error'
        })
    }
});

router.post('/',  async (req, res) => {
    const { applicationNumber, clientId, trailersIds, worksIds, partsIds} = req.body;

    const application = new Application({
        applicationNumber: applicationNumber,
        clientId: Types.ObjectId(clientId),
        trailersIds: trailersIds,
        worksIds: worksIds,
        partsIds: partsIds,
        dateCreated: new Date().toISOString(),
        dateModified: new Date().toISOString(),
    });

    try {
        const result = await application.save();
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
        const application = await Application.findById(req.body._id);
        if (!application) {
            res.status(400).json({message: 'Application not found'});
            return;
        }
        console.log(application);
        delete req.body._id;
        Object.assign(application, req.body);
        await application.save();
        res.status(202).json();
    } catch(e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error'
        })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Application.deleteOne({_id: id});
        res.status(202).json({id});
    } catch(e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error'
        })
    }
});

module.exports = router;