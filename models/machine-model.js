const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
            type: Schema.Types.ObjectId,  
            ref: "vendor"
        }
    }]
}, {
    timestamps: {createdAt: 'insert_date', updatedAt: 'update_date'}
});

const Machine = mongoose.model('machine', machineSchema);

module.exports = Machine;