const mongoose = require("mongoose");
const { AutoIncrementSimple } = require("@typegoose/auto-increment");

const storeSchema = new mongoose.Schema({
    storeID: {
        type: Number,
        required: true,
        unique: true
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

storeSchema.plugin(AutoIncrementSimple, [{ field: 'storeID' }]);
exports = mongoose.model("Store", storeSchema);