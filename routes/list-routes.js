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

// Component > ALL
router.get('/component/:component/all', (req, res)=>{
    Component.findOne({name: req.params.component})
    .populate('vendor')
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
router.get('/component/:component/ComponentVendors', (req, res)=>{
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

// Machine > components
router.get('/machine/:machine/MachineComponents', (req, res)=>{
    Machine.findOne({name: req.params.machine})
    .populate('components.component')
    .exec((err, machine)=>{
        if(err) throw err;
        if(machine){
            res.send(machine)
        }else{
            res.send(`Can not find ${req.params.machine}`);
        }   
    });
});

// Machine > componentVendor
router.get('/machine/:machine/MachineVendors', (req, res)=>{
    Machine.findOne({name: req.params.machine})
    .populate({
        path: 'components.componentVendor', 
        model: 'vendor'
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

// Machine > components & componentVendor
router.get('/machine/:machine/MachineComponentsAndVendors', (req, res)=>{
    Machine.findOne({name: req.params.machine})
    .populate({
        path: 'components.component', 
        model: 'component',
        select: { 'name': 1, 'size': 1}
    })
    .populate({
        path: 'components.componentVendor', 
        model: 'vendor',
        select: 'name'
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
    .populate({
        path: 'components.component',
        populate: {
            path: 'vendor'
        }
    })
    .populate({
        path: 'components.componentVendor', 
        model: 'vendor'
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