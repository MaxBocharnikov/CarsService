const {Schema, model} = require('mongoose');

const partSchema = new Schema({
    number: {type: String, required: true},
    name: {type: String, required: true},
    isReplacement: {type: Boolean},
    type: {type: String},
});

module.exports = model('Part', partSchema);

