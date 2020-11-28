const { model, Schema, SchemaTypes } = require('mongoose');

const ProductSchema = new Schema({
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
    },
    photo: SchemaTypes.String
});

const Product = model('Product', ProductSchema);

module.exports = Product;