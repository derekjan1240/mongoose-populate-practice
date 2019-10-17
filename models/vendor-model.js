const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vendorSchema = new Schema({
    name: String,
    country: String,
    employees: Number
}, {
    timestamps: {createdAt: 'insert_date', updatedAt: 'update_date'}
});

const Vendor = mongoose.model('vendor', vendorSchema);

module.exports = Vendor;