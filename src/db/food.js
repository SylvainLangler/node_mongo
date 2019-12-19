import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: String,
    brand: String,
    bar_code: Number,
    grade: Number,
    quantity: String,
    pictures: [String],
    ingredients: [Object],
    comments: [Object]
});

export const productModel = mongoose.model('product', productSchema, 'products')