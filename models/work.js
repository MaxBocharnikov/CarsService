const {model} = require('mongoose');
const BaseSchema = require('./baseSchema');

const workSchema = new BaseSchema({
    name: {type: String, required: true},
    shortName: {type: String},
    number: {type: String},
    time: {type: Number, required: true},
});

module.exports = model('Work', workSchema);

