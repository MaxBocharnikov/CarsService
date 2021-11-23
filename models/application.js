const {model} = require('mongoose');
const BaseSchema = require('./baseSchema');

const applicationSchema = new BaseSchema({
    clientId: {type: BaseSchema.Types.ObjectId, ref: 'Client', required: true},
    trailersIds: [{type: BaseSchema.Types.ObjectId, ref: 'Trailer', required: true}],
    contactName: {type: String, required: true},
    contactPhone: {type: String, required: true},
    workingHourId: {type: String, ref: 'WorkingHour'},
    description: {type: String, required: true},
    postId: {type: String, ref: 'Post', required: true},
    startDate: {type: String, required: true},
    endDate: {type: String, required: true},
    worksIds: [{type: BaseSchema.Types.ObjectId, ref: 'Work'}],
    partsIds: [{type: BaseSchema.Types.ObjectId, ref: 'Part'}],
    dateCreated: {type: String, required: true},
});

module.exports = model('Application', applicationSchema);

