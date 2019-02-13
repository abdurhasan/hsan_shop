

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productSchema = new Schema({
    code:String,
    title: String,
    rate: Number,
    description:String,
    price:Number,
    brand:String,
    color:Array,
    memory:Array,
    testimony:Array,
    image:String
})

module.exports = mongoose.model('Product', productSchema);
