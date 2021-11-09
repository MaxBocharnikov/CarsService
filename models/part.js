const { model} = require('mongoose');
const BaseSchema = require('./baseSchema');

const partSchema = new BaseSchema({
    number: {type: String, required: true},
    name: {type: String, required: true},
    isReplacement: {type: Boolean},
    type: {type: String},
});

module.exports = model('Part', partSchema);

