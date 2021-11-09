const {Schema} = require('mongoose');

class BaseSchema extends Schema {
    constructor(sche) {
        super(sche);
        this.set('toJSON', {
            virtuals: true,
            transform: (doc, converted) => {
                delete converted._id;
            }
        });
    }
}

module.exports = BaseSchema;