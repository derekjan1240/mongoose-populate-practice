const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Denormalization 
const machineSchema = new Schema({
    name: String,
    description: String,
    country: String,
    components:[{
        component:{
            type: Schema.Types.ObjectId,
            ref: "component"
        },
        componentCount: Number,
        componentVendor: {
            type: Schema.Types.ObjectId,  // present machine's component's vendor
            ref: "vendor"
        }
    }]
    // component:[{
    //     type: Schema.Types.ObjectId,
    //     ref: "component"
    // }],
    // componentVendor:[{
    //     type: Schema.Types.ObjectId,
    //     ref: "vendor"
    // }],
    // componentCount:[String],
    
}, {
    timestamps: {createdAt: 'insert_date', updatedAt: 'update_date'}
});

const Machine = mongoose.model('machine', machineSchema);

module.exports = Machine;