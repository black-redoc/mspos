const { model, Schema, SchemaTypes } = require('mongoose');

const CustomerSchema = new Schema({
    identification_type: SchemaTypes.String,
    identification_number: SchemaTypes.Number,
    name: SchemaTypes.String,
    created_at: {
        type: SchemaTypes.Date,
        default: Date.now
    }
})

module.exports = model('Customer', CustomerSchema);