const {Router} = require('express');
const Order = require('../models/order');
const router = Router();


router.post('/list', async (req, res) => {
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
        const orders = await Order.find(filter)
            .populate('clientId')
            .populate('trailersIds')
            .populate('works')
            .populate('parts')
            .populate('recommendedWorks')
            .populate('recommendedParts')
            .exec()
        res.status(200).json(orders);
    } catch(e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error'
        })
    }
});


router.get('/:id', async (req, res) => {
    try {
        const order = await Order
            .findById(req.params.id)
            .populate('clientId')
            .populate('trailersIds')
            .populate('works')
            .populate('parts')
            .populate('recommendedWorks')
            .populate('recommendedParts')
            .exec();
        res.status(200).json(order);
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
            recommendationDescription,
            recommendedWorks,
            recommendedParts,
            recommendationSum,
            applicationId,
            status,
        } = req.body;

        const order = new Order({
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
            recommendationDescription,
            recommendedWorks,
            recommendedParts,
            recommendationSum,
            applicationId,
            status,
            dateCreated: new Date().toLocaleString()
        });
        const result = await order.save();
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
        const order = await Order.findById(req.body.id);
        if (!order) {
            res.status(400).json({message: 'Order not found'});
            return;
        }
        delete req.body._id;
        Object.assign(order, req.body);
        await order.save();
        res.status(200).json();
    } catch(e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error'
        })
    }
});


module.exports = router;