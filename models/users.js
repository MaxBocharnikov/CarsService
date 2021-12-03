const {model} = require('mongoose');
const BaseSchema = require('./baseSchema');

const workSchema = new BaseSchema({
    login: {type: String, required: true},
    password: {type: String, required: true}
});

module.exports = model('Work', workSchema);

