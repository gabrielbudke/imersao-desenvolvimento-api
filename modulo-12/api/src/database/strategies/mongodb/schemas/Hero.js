import mongoose from "mongoose";

const HeroSchema = new mongoose.Schema({
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
}, {
    collection: "heroes"
});

export default mongoose.model("Hero", HeroSchema);