const {Schema, model} = require('mongoose');

const clientSchema = new Schema({
    name: {type: String, required: true},
    inn: {type: String},
    kpp: {type: String},
    typeId: {type: String, required: true, ref: 'ClientType'},
    address: {type: String},
    phone: {type: String},
    email: {type: String},
});

module.exports = model('Client', clientSchema);

