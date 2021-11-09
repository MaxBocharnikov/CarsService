const {Router} = require('express');
const Post = require('../models/post');
const router = Router();

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch(e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error'
        })
    }
});


router.post('/',  async (req, res) => {
    const { title } = req.body;
    const post = new Post({
        title
    });

    try {
        const result = await post.save();
        res.status(201).json({result})
    } catch(e) {
        console.log(e)
        res.status(500).json({
            message: 'Server error'
        })
    }
});

module.exports = router;
