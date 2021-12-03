const {Router} = require('express');
const User = require('../models/users');
const router = Router();

router.post('/register', (req, res) => {
    const user = new User(req.body);
    req.session.user = user._id;
    user
        .save()
        .then((result) => {
            req.session.save(() => {
                return res.json({
                    message: 'You successfully login',
                    auth: true,
                })})
        })
        .catch((err) => {
            res.json({
                message: 'unable to create account',
                auth: false,
            });
        });
});


router.post('/login',  async (req, res) => {
    try {
        const {login, password} = req.body;
        const user = await User.findUser(login, password);
        if (user) {
            req.session.user = user._id;
            console.log(req.session)
            return req.session.save((err) => {
                console.log(err);
                res.json({
                    message: 'You successfully login',
                    auth: true,
                })})
        } else {
            res.status(403).json({
                message: 'unable to login',
                auth: false,
            })
        }
    } catch(e) {
        console.log(e)
        res.status(500).json({
            message: 'Server error'
        })
    }
});


router.get('/logout',  async (req, res) => {
    try {
        req.session.destroy();
        res.status(201).json({auth: false})
    } catch(e) {
        console.log(e)
        res.status(500).json({
            message: 'Server error'
        })
    }
});

router.get('/haslogin', async (req, res) => {
    console.log(req.session)
    if (req.session.user) {
        res.json({
            auth: true,
            message: 'You are login'
        })
    } else {
        res.json({
            auth: false,
            message: 'you are not login'
        })
    }
});


module.exports = router;
