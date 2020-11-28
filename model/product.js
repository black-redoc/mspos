const { model, Schema, SchemaTypes } = require('mongoose');

const Product = model('Product', new Schema(
    {
        name: {
            type: SchemaTypes.String,
            required: true
        },
        price: {
            type: SchemaTypes.Number,
            required: true
        },
        stockApplies: {
            type: SchemaTypes.Boolean,
            required: true,
            default: false
        },
        minimunStock: type: SchemaTypes.Number,
        stock: SchemaTypes.Number,
        code: {
            type: SchemaTypes.Number,
            required: true
        }
    }
));

module.exports = Product;