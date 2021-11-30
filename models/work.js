const {model} = require('mongoose');
const BaseSchema = require('./baseSchema');

const workSchema = new BaseSchema({
    name: {type: String, required: true},
    time: {type: Number, required: true},
    number: {type: String},
});

module.exports = model('Work', workSchema);

