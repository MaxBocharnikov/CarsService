const { model} = require('mongoose');
const BaseSchema = require('./baseSchema');

const partSchema = new BaseSchema({
    name: {type: String, required: true},
    number: {type: String, required: true},
    numberZN: {type: String},
    prefix: {type: String},
    price: {type: Number, required: true},
    retailPrice: {type: Number},
    quantity: {type: Number, required: true},
    reserved: {type: Number},
});

module.exports = model('Part', partSchema);

