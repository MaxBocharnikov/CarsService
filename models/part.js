const { model} = require('mongoose');
const BaseSchema = require('./baseSchema');

const partSchema = new BaseSchema({
    number: {type: String, required: true},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
    reserved: {type: Number},
});

module.exports = model('Part', partSchema);

