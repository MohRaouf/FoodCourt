const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose.connection);

const storeSchema = new mongoose.Schema({
    storeID: {
        type: Number,
        unique: true,
    },
    storeName: {
        type: String,
        required: true,
    },
    storeDescription: {
        type: String,
        required: true,
    },
    storeLogo: {
        type: String,
        required: true,
    },
});
storeSchema.index({ storeName: 1 }, { unique: true });
storeSchema.plugin(AutoIncrement, { inc_field: 'storeID' });
module.exports = mongoose.model("Store", storeSchema);