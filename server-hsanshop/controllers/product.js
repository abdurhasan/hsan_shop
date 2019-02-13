const Product = require('../models/product');


module.exports = {
    getData: function (req, res, next) {
        let page = Number(req.query.page) * 4 || 0

        productlists = []
        Product.find({}).limit(4).skip(page).exec(function (err, data) {
            if (err) {
                next(err);
            } else {
                data.map(snap => {
                    productlists.push({   
                        id:snap._id,                        
                        title: snap.title,
                        image: snap.image,
                        rate: snap.rate,
                        description: snap.description,
                        price: snap.price,
                        brand: snap.brand,
                        color: snap.color,
                        memory: snap.memory,
                        testimony: snap.testimony,
                        code: snap.code
                    })  
                })
                res.json(productlists)

            }
        });
    },
    getPages: function (req, res, next) {

        Product.find({}).count().exec(function (err, pages) {
            if (err) {
                next(err);
            } else {
                res.json(pages)

            }
        });
    },
    getAll: function (req, res, next) {
        productlists = []
        Product.find({}).exec(function (err, data) {
            if (err) {
                next(err);
            } else {
                data.map(snap => {
                    productlists.push({
                        title: snap.title,
                        id: snap._id,
                        rate: snap.rate,
                        description: snap.description,
                        price: snap.price,
                        brand: snap.brand,
                        color: snap.color,
                        memory: snap.memory,
                        image: snap.image
                    })
                })

                res.json(productlists)
            }
        });
    },
    create: function (req, res, next) {
        const ini = req.body
        
        Product.create({
            title: ini.title,
            image: ini.image,
            rate: ini.rate,
            description: ini.description,
            price: ini.price,
            brand: ini.brand,
            color: ini.color,
            memory: ini.memory,
            testimony: ini.testimony
        }, function (err, result) {
            if (err)
                res.json(err)
            else
                res.json(result);

        });
    },


    getById: function (req, res, next) {       
        let id = req.params.id || req.body.id
        
        Product.findById(id, function (err, data) {
            if (err) {
                next(err);
            } else {
                res.json({ success: true, data});
            }
        });
    },

    uploadFile: function(req,res,next){
        let file = req.files.fileUpload
        let filename = Date.now()+req.files.fileUpload.name.toLowerCase().replace(/ /g, '')
        req.body['color'] = req.body.color.split(",")
        req.body['memory'] = req.body.memory.split(",")

        let data = Object.assign({},req.body,{image:`https://api-hsanshop.herokuapp.com/uploads/${filename}`})            
        //  .....INSERT KE DATABASE
        
        Product.create(data,(err,result)=>{
            if(err)next({err})
            
        })

        file.mv(__dirname + `/../public/uploads/${filename}`, function (err) {
          if (err) next(err)
        })
        res.json({success:true})
    }

    // deleteById: function (req, res, next) {
    //     let id = req.params.id || req.body.id
    //     Phonebook.findByIdAndRemove(id, function (err, data) {
    //         if (err)
    //             next(err);
    //         else {
    //             res.json({ success: true, message: "Data deleted successfully!!!", data });
    //         }
    //     });
    // },
    // updateById: function (req, res, next) {        
    //     let id = req.params.id || req.body.id                
    //     console.log('ID',id)
    //     console.log('BODY',req.body)
    //     Phonebook.findByIdAndUpdate(id, {
    //         name: req.body.name,
    //         phone: req.body.phone
    //       }, (function (err) {
    //         if (err)
    //             next(err);
    //         else {
    //             res.json({ success: true, message: "Data update successfully!!!", data: {
    //                 _id: id,
    //                 name: req.body.name,
    //                 phone: req.body.phone
    //               } });
    //         }
    //     }))
    // },
    // search: function (req, res) {
    //     let keyword = {};
    //     if (req.query.name) {
    //         keyword.name =  { $regex: new RegExp("^" + req.query.name.toLowerCase(), "i") }             
    //     }
    //     if (req.query.phone) {
    //         keyword.phone =  { $regex: new RegExp("^" + req.query.phone.toLowerCase(), "i") } 

    //     }        

    //     Phonebook.find(keyword).then(snap => {
    //         let data = snap.map(el=>{
    //             return {code:el.code,name:el.name,phone:el.phone}
    //         })

    //         res.json({ phoneList:data  });


    //     })            
    // }


}


