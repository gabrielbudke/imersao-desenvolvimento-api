const { Sequelize, DataTypes } = require("sequelize");

// const sequelize = new Sequelize("heroes", "admin", "admin", {
//     host: "localhost",
//     dialect: "postgres",
//     quoteIdentifiers: false
// });

const sequelize = new Sequelize({
    dialect: "postgres",
    host: "localhost",
    database: "heroes",
    username: "admin",
    password: "admin",
    logging: false
});

async function main() {
    const Heroes = sequelize.define("Heroes", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        power: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: "tb_heroes",
        freezeTableName: false,
        timestamps: false
    });

    /**
     * Ao definir um model, nós estamos dizendo ao Sequelize algumas coisas sobre a tabela no banco de dados.
     * Mas, e se a tabela não existir ou até mesmo existir porém as colunas são diferentes? 
     * 
     * É aqui que entra a sincronização. O model é sincrozinado através do método model.sync()
     */
    await Heroes.sync();

    /**
     * Realizando uma consulta utilizando o model criado: SELECT * FROM heroes;
     */
    await Heroes.create({ name: "Lanterna Verde", power: "Anel" });
    const heroes = await Heroes.findAll({
        raw: true,
        attributes: ["name"]
    });
    console.log("[heroes]", heroes);


}

main();