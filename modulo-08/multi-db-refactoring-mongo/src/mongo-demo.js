const mongoose = require("mongoose");

const main = async () => {

    try {
        mongoose.connect("mongodb://gabriel.sousa:admin@localhost:27017/heroes");
        console.log("[INFO]: Connected to database with success!");
    } catch (error) {
        console.error("[ERROR]:", error.message);
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

    // Cria o model do herói
    const Hero = mongoose.model("Hero", hero);   

    // Executa o comando Insert
    await Hero.create({ name: "Arqueiro Verde", power: "Flechas" });

    // Executa o Select
    const heroes = await Hero.find();
    console.log("[INFO]:", heroes);

    // Executa o comando Delete
    await Hero.deleteMany();

    mongoose.disconnect();
    console.log("[INFO]: Database disconnected!");
}

main();