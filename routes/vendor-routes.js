const Vendor = require('../models/vendor-model');
const router = require('express').Router();

router.get('/all', (req, res)=>{
    Vendor.find({}).then((vendors)=>{
        res.json(vendors);
    });
});

router.get('/:id', (req, res)=>{
    if(mongoose.Types.ObjectId.isValid(req.params.id)){
        Vendor.findById(req.params.id).exec((err, vendor)=>{
            res.json(vendor);
        });
    }else{
        res.send("Invalid ID")
    }
});

router.post('/vendor', (req, res)=>{
    vendor = req.body;
    console.log(vendor);
    new Vendor({
        name: vendor.vendorName,
        country: vendor.vendorCountry,
        employees: vendor.vendorEmployees
    }).save()
    .then((newVendor) =>{
        console.log('> created new vendor: ', newVendor);
        res.send(newVendor);
        
    }).catch((err) => {
        console.log("err while saving", err);
        res.send(err);
    });
});

module.exports = router;