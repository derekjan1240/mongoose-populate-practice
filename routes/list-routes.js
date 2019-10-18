const Machine = require('../models/machine-model');
const Component = require('../models/component-model');
const Vendor = require('../models/vendor-model');

const router = require('express').Router();

// Vendor
router.get('/vendor/:vendor/all', (req, res)=>{
    Vendor.findOne({name: req.params.vendor})
    .exec((err, vendor)=>{
        if(err) throw err;
        if(vendor){
            res.send(vendor);
        }else{
            res.send(`Can not find ${req.params.vendor}`);
        }   
    });
});

// Vendor > Components
router.get('/vendor/:vendor/components', (req, res)=>{
    Vendor.findOne({name: req.params.vendor})
    .exec((err, vendor)=>{
        if(err) throw err;
        if(vendor){
            Component.find({vendor: vendor._id})
            .select({'vendor': 0, '_id': 0})
            .exec((err, component)=>{
                if(err) throw err;
                if(component){
                    res.send(component)
                }else{
                    res.send(`${req.params.vendor} does not have any component!`);
                }
            })
        }else{
            res.send(`Can not find ${req.params.vendor}`);
        }   
    });
});

// Component > ALL
router.get('/component/:component/all', (req, res)=>{
    Component.findOne({name: req.params.component})
    .select({'_id': 0})
    .populate({
        path:'vendor',
        select: { '_id': 0}
    })
    .exec((err, component)=>{
        if(err) throw err;
        if(component){
            res.send(component);
        }else{
            res.send(`Can not find ${req.params.component}`);
        }   
    });
});

// Component > vendors
router.get('/component/:component/componentVendors', (req, res)=>{
    Component.findOne({name: req.params.component})
    .populate('vendor')
    .exec((err, component)=>{
        if(err) throw err;
        if(component){
            res.send(component.vendor);
        }else{
            res.send(`Can not find ${req.params.component}`);
        }   
    });
});

// Component > Machines
router.get('/component/:component/machines', (req, res)=>{
    Component.findOne({name: req.params.component})
    .exec((err, component)=>{
        if(err) throw err;
        if(component){
            Machine.find({"components.component": component._id})
            .select({'components': 0, '_id': 0})
            .exec((err, machine)=>{
                if(err) throw err;
                if(machine){
                    res.send(machine)
                }else{
                    res.send(`${req.params.component} does not use in machines!`);
                }
            })
        }else{
            res.send(`Can not find ${req.params.vendor}`);
        }   
    });
});

// Machine > components
router.get('/machine/:machine/machineComponents', (req, res)=>{
    Machine.findOne({name: req.params.machine})
    .populate({
        path:'components.component',
        select: { 'vendor': 0, '_id': 0}
    })
    .exec((err, machine)=>{
        if(err) throw err;
        if(machine){
            res.send(machine.components)
        }else{
            res.send(`Can not find ${req.params.machine}`);
        }   
    });
});

// Machine > componentVendor
router.get('/machine/:machine/machineVendors', (req, res)=>{
    Machine.findOne({name: req.params.machine})
    .populate({
        path: 'components.componentVendor', 
        select: {'_id': 0}
    })
    .exec((err, machine)=>{
        if(err) throw err;
        if(machine){
            // console.log(machine);
            res.json(machine.components)
        }else{
            res.send(`Can not find ${req.params.machine}`);
        }   
    });
});

// Machine > components & componentVendor
router.get('/machine/:machine/machineComponentsAndVendors', (req, res)=>{
    Machine.findOne({name: req.params.machine})
    .populate({
        path: 'components.component', 
        model: 'component',
        select: { 'vendor': 0, '_id': 0}
    })
    .populate({
        path: 'components.componentVendor', 
        model: 'vendor',
        select: {'_id': 0}
    })
    .exec((err, machine)=>{
        if(err) throw err;
        if(machine){
            // console.log(machine);
            res.json(machine)
        }else{
            res.send(`Can not find ${req.params.machine}`);
        }   
    });
});

// Machine > All Info
router.get('/machine/:machine/all', (req, res)=>{
    Machine.findOne({name: req.params.machine})
    .select({'_id': 0})
    .populate({
        path: 'components.component',
        populate: {
            path: 'vendor',
            select: {'_id': 0}
        }
    })
    .populate({
        path: 'components.componentVendor', 
        model: 'vendor',
        select: {'_id': 0}
    })
    .exec((err, machine)=>{
        if(err) throw err;
        if(machine){
            // console.log(machine);
            res.json(machine)
        }else{
            res.send(`Can not find ${req.params.machine}`);
        }   
    });
});
module.exports = router;