const {Router} = require('express');
const {Types} = require('mongoose');
const Application = require('../models/application');
const Client = require('../models/client');
const router = Router();
const auth = require('../middleware/auth');

router.post('/list', auth, async (req, res) => {
    try {
        const { query } = req.body;
        const filter = {};
        if (query) {
            const client = await Client.findOne({
                "name": new RegExp(query, 'i')
            });
            if (client) {
                filter["clientId"] = client.id
            } else {
                res.status(200).json([]);
                return;
            }
        }
        const applications = await Application.find(filter)
        .populate('clientId')
        .populate('trailersIds')
        .populate('works')
        .populate('parts')
        .exec()
        res.status(200).json(applications);
    } catch(e) {
        console.log(e);
    res.status(500).json({
        message: 'Server error'
    })
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const application = await Application
            .findById(req.params.id)
            .populate('clientId')
            .populate('trailersIds')
            .populate('works')
            .populate('parts')
            .exec();
        res.status(200).json(application);
    } catch(e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error'
        })
    }
});

router.post('/getByDate', auth, async (req, res) => {
    try {
        const { startDate, endDate } = req.body;
        const applications = await Application.find({
            "startDate": { $gte: startDate },
            "endDate": { $lte: endDate },
        }, {
            _id: 1,
            clientId: 1,
            startDate: 1,
            endDate: 1,
            postId: 1,
            trailersIds: 1,
        }).populate("clientId").populate('trailersIds')
        res.status(200).json(applications);
    } catch(e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error'
        })
    }
});

router.post('/', auth,  async (req, res) => {
    const {
        clientId,
        trailersIds,
        contactName,
        contactPhone,
        workingHourId,
        description,
        postId,
        startDate,
        endDate,
        works,
        parts,
    } = req.body;

    const application = new Application({
        clientId: clientId,
        trailersIds: trailersIds,
        contactName: contactName,
        contactPhone: contactPhone,
        workingHourId: workingHourId,
        description: description,
        postId: postId,
        startDate: startDate,
        endDate: endDate,
        works: works,
        parts: parts,
        dateCreated: new Date().toLocaleString(),
        userId: req.session.user,
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

router.put('/', auth, async (req, res) => {
    try {
        const application = await Application.findById(req.body.id);
        if (!application) {
            res.status(400).json({message: 'Application not found'});
            return;
        }
        delete req.body._id;
        Object.assign(application, {...req.body, userId: req.session.user});
        await application.save();
        res.status(200).json();
    } catch(e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error'
        })
    }
});

router.delete('/:id', auth, async (req, res) => {
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
