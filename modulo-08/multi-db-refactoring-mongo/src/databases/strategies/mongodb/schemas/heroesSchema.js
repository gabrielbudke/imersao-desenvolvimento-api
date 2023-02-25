const mongoose = require("mongoose");

const heroSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    power: {
        type: String,
        required: true
    },
    insertedAt: {
        type: Date,
        default: Date.now()
    }
}, { collection: "heroes" });

module.exports = mongoose.model("Hero", heroSchema);