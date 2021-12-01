const { model} = require('mongoose');
const BaseSchema = require('./baseSchema');

const partSchema = new BaseSchema({
    name: {type: String, required: true},
    number: {type: String, required: true},
    prefix: {type: String, require: true},
    price: {type: Number, required: true},
    markUp: {type: String},
    retailPrice: {type: Number},
    category: {type: String, required: true},
    measure: {type: String, required: true},
    quantity: {type: Number, required: true},
    reserved: {type: Number, required: true},
});

module.exports = model('Part', partSchema);

