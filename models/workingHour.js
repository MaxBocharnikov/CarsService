const {model} = require('mongoose');
const BaseSchema = require('./baseSchema');

const workingHourSchema = new BaseSchema({
    title: {type: String, required: true},
});

module.exports = model('WorkingHour', workingHourSchema);

