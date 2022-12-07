const mongoose = require("mongoose");
mongoose.onc

const main = async () => {

    try {
        await mongoose.connect("mongodb://gabriel.sousa:admin@localhost:27017/heroes");
        console.log("[INFO]: Connected to database with success!");
    } catch (error) {
        console.error("[ERROR]:", error);
    }

    const hero = mongoose.Schema({
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
            default: new Date()
        }
    });

    const Hero = mongoose.model("Hero", hero);
    await Hero.create({ name: "Arqueiro Verde", power: "Flechas" });
    // await Hero.deleteOne();
    const heroes = await Hero.find();
    console.log("[INFO]:", heroes);

    mongoose.disconnect();
    console.log("[INFO]: Database disconnected!");
}

main();