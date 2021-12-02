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
    works: [{
        workId: {type: BaseSchema.Types.ObjectId, ref: 'Work', required: true},
        name: {type: String, required: true},
        time: {type: String, required: true},
        quantity: {type: Number, required: true},
        pricePerHour: {type: Number, required: true},
        sum: {type: Number, required: true},
    }],
    parts: [{
        partId: {type: BaseSchema.Types.ObjectId, ref: 'Part', required: true},
        name: {type: String, required: true},
        quantity: {type: Number, required: true},
        remainers: {type: Number, required: true},
        price: {type: Number, required: true},
        sum: {type: Number, required: true},
        number: {type: String, required: true},
        reserved: {type: Number},
    }],
    dateCreated: {type: String, required: true},
    sum: {type: Number},
});

module.exports = model('Application', applicationSchema);

