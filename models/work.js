const {model} = require('mongoose');
const BaseSchema = require('./baseSchema');

const workSchema = new BaseSchema({
    number: {type: String, required: true},
    name: {type: String, required: true},
});

module.exports = model('Work', workSchema);

