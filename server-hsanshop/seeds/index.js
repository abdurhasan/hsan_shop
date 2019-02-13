// Connecting to the database
const Product = require("../models/product");
const fs = require('fs');
const mongoose = require('mongoose');
let data = JSON.parse(fs.readFileSync(__dirname + '/initial.json', 'utf8'));
require('dotenv').config()


mongoose.connect(process.env.DATABASE, { useNewUrlParser: true }, (err) => {
    if (err) throw(err);
    
    Product.insertMany(data, function (err) {
        if (err) console.log(err);  
        console.log('Inject success')      
        process.exit()
    })

})
.then(x=>{
    console.log('Connected')
})

.catch(x=>{
    console.log(x);
})






