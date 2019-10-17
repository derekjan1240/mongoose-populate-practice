const Component = require('../models/component-model');
const Vendor = require('../models/vendor-model');

const router = require('express').Router();

router.get('/all', (req, res)=>{
    Component.find({}).then((components)=>{
        res.json(components)
    });
});

router.get('/component/:id', (req, res)=>{
    if(mongoose.Types.ObjectId.isValid(req.params.id)){
        Component.findById(req.params.id).exec((err, component)=>{
            res.json(component);
        });
    }else{
        res.send("Invalid ID")
    }
})

router.get('/component/:name/vendors', (req, res)=> {
    Component.findOne({name: req.params.name})
    .populate('vendor')
    .exec((err, component)=>{
        if(err) throw err;
        if(component){
            // console.log(component);
            res.json(component.vendor)
        }else{
            res.send(`Can not find ${req.params.name}`);
        }   
    });
});

router.post('/component', (req, res)=>{
    const componentData = req.body;
    console.log(componentData)

    const handleVendorID = new Promise((resolve, reject) => {
        Vendor.find({
            name: {$in: componentData.componentVendors}
        }).then((vendors)=>{
            if(vendors.length){
                let vendorID = [];
                vendors.forEach((vendor)=>{
                    vendorID.push(vendor._id);
                })
                resolve(vendorID); 
            }else{
                res.send('Can not find vendors !');
            }
        })
    }); 

    handleVendorID
    .then((componentVendor)=>{
        new Component({
            name: componentData.componentName,
            size: componentData.componentSize,
            vendor: componentVendor
        }).save()
        .then((newComponent) =>{
            console.log('> created new component: ', newComponent);
            res.send(newComponent);
        }).catch((err) => {
            console.log("err while saving", err);
            res.send(err);
        });
    })
    .catch((err)=>{
        console.log(err);
        res.send(err);
    })
});

module.exports = router;