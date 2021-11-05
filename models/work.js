const {Schema, model} = require('mongoose');

const workSchema = new Schema({
    number: {type: String, required: true},
    name: {type: String, required: true},
});

module.exports = model('Work', workSchema);

