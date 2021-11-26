const {model} = require('mongoose');
const BaseSchema = require('./baseSchema');

const trailerSchema = new BaseSchema({
    type: {type: String, required: true},
    model: {type: String, required: true},
    vin: {type: String},
    stateNumber: {type: String},
    mileage: {type: String},
    client: {type: String},
    name: {type: String, required: true},
    contract: {type: String},
    guaranteeType: {type: String},
    guaranteeStartDate: {type: String},
    guaranteeEndDate: {type: String},
});

module.exports = model('Trailer', trailerSchema);
