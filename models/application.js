const {Schema, model} = require('mongoose');

const applicationSchema = new Schema({
    applicationNumber: {type: String, required: true},
    clientId: {type: Schema.Types.ObjectId, ref: 'Client', required: true},
    trailersIds: [{type: Schema.Types.ObjectId, ref: 'Trailer', required: true}],
    worksIds: [{type: Schema.Types.ObjectId, ref: 'Work', required: true}],
    partsIds: [{type: Schema.Types.ObjectId, ref: 'Part', required: true}],
    dateCreated: {type: String, required: true},
    dateModified: {type: String, required: true},
});

module.exports = model('Application', applicationSchema);

