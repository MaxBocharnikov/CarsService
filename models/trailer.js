const {model} = require('mongoose');
const BaseSchema = require('./baseSchema');

const trailerSchema = new BaseSchema({
    model: {type: String, required: true},
    stateNumber: {type: String},
    mileage: {type: String},
    vin: {type: String},
    clientId: {type: String, required: true, ref: 'Client'},
});

module.exports = model('Trailer', trailerSchema);

