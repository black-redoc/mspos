const { model, Schema, SchemaTypes } = require('mongoose');
const { ItemSchema } = require('./item');
const { CustomerSchema } = require('./customer');

const OrderSchema = new Schema({
    customer: CustomerSchema,
    products: {
        type: [ItemSchema],
        required: true,
    },
    total_price: {
        type: SchemaTypes.Number,
        required: true,
    },
    success: {
        type: SchemaTypes.Boolean,
        required: true,
    },
    created_at: {
        type: SchemaTypes.Date,
        default: Date.now
    }
});

exports.Order = model('Order', OrderSchema);