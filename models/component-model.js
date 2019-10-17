const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const componentSchema = new Schema({
    name: String,
    size: Number,
    vendor:[{
        type: Schema.Types.ObjectId,
        ref: "vendor"
    }]
}, {
    timestamps: {createdAt: 'insert_date', updatedAt: 'update_date'}
});

const Component = mongoose.model('component', componentSchema);

module.exports = Component;