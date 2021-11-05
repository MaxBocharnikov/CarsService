const {Schema, model} = require('mongoose');

const clientTypeSchema = new Schema({
    type: {type: String},
});

module.exports = model('ClientType', clientTypeSchema);

