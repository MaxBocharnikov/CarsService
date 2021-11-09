const {model} = require('mongoose');
const BaseSchema = require('./baseSchema');

const clientTypeSchema = new BaseSchema({
    type: {type: String},
});

module.exports = model('ClientType', clientTypeSchema);

