const Machine = require('../models/machine-model');
const Component = require('../models/component-model');
const Vendor = require('../models/vendor-model');
const router = require('express').Router();

router.get('/all', (req, res)=>{
    Machine.find({}).then((machines)=>{
        res.json(machines)
    });
});

router.get('/:id', (req, res)=> {
    if(mongoose.Types.ObjectId.isValid(req.params.id)){
        Machine.findById(req.params.id).exec((err, machine)=>{
            res.json(machine);
        });
    }else{
        res.send("Invalid ID")
    }
});

router.post('/machine', (req, res)=>{
    const machineData = req.body;

    // Turn data to MongoDB ObjectID
    const handleVendorID = new Promise((resolve, reject) => {
        let vendorsQuery = machineData.vendorsQuery ;
        Vendor.find({
            name: {$in: vendorsQuery}
        }).then((vendors)=>{
            if(vendors.length){
                let vendorID = vendorsQuery;
                vendors.forEach((vendor)=>{
                    // Replace duplicate vendor
                    vendorID = vendorID.map((item)=>{ 
                        return item == vendor.name ? vendor.id : item; 
                    });
                });
                resolve(vendorID); 
            }else{
                res.send('Can not find vendors !');
            }
        })
    }); 

    const handleComponentID = new Promise((resolve, reject) => {
        let componentsQuery = machineData.componentsQuery;
        Component.find({
            name: {$in: componentsQuery}
        }).then((components)=>{
            if(components.length){
                let componentID = componentsQuery;
                components.forEach((component)=>{
                    // Replace duplicate component
                    componentID = componentID.map((item)=>{ 
                        return item == component.name ? component.id : item; 
                    });
                });
                resolve(componentID);   
            }else{
                reject('Can not find components !');
            }
        })
    }); 
    
    Promise.all([handleVendorID, handleComponentID])
    .then((values)=>{                    
        // [vendorID, componentID] 
        // Handle machineComponent data array->object
        let machineComponent = []
        for(let j=0; j<Math.max(values[0].length, values[1].length); j++){
            let temp ={};
            temp.component = values[1][j];
            temp.componentVendor = values[0][j];
            temp.componentCount = machineData.componentCount[j];
            machineComponent.push(temp);
        }
        return machineComponent;
    })
    .then((machineComponent) => {         
        // [machineComponent]
        // Create Machine
        new Machine({
            name: machineData.machineName,
            description: machineData.machineDescription,
            country: machineData.machineCountry,
            components: machineComponent
        }).save()
        .then((newMachine) =>{
            console.log('> created new machine: ', newMachine);
            res.send(newMachine);
        }).catch((err) => {
            console.log("err while saving", err);
            res.send(err);
        });

    }).catch((err) =>{
        console.log(err);
        res.redirect('/');
    });
});

module.exports = router;