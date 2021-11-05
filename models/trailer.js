const {Schema, model} = require('mongoose');

const trailerSchema = new Schema({
    model: {type: String, required: true},
    stateNumber: {type: String},
    mileage: {type: String},
    vin: {type: String},
    clientId: {type: String, required: true, ref: 'Client'},
});

module.exports = model('Trailer', trailerSchema);

