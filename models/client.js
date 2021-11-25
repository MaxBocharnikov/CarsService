const {model} = require('mongoose');
const BaseSchema = require('./baseSchema');

const clientSchema = new BaseSchema({
    type: {type: String, required: true},
    name: {type: String, required: true},
    address: {type: String},
    legalAddress: {type: String},
    inn: {type: String},
    kpp: {type: String},
    ogrn: {type: String},
    carInfo: [{
        name: {type: String}
    }],
    contactInfo: [{
        name: {type: String},
        phone: {type: String},
        email: {type: String},
        comment: {type: String},
    }],
});

module.exports = model('Client', clientSchema);

