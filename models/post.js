const {model} = require('mongoose');
const BaseSchema = require('./baseSchema');

const postsSchema = new BaseSchema({
    title: {type: String, required: true},
});

module.exports = model('Post', postsSchema);

