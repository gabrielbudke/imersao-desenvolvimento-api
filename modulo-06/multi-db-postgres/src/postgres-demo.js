const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("heroes", "admin", "admin", {
    host: "localhost",
    dialect: "postgres",
    quoteIdentifiers: false
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
    const heroes = await Heroes.findAll({ raw: true });
    console.log("[heroes]", heroes);

    /**
     * Criando um model para os Vilões
     */
    const Villains = sequelize.define("Villains", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        power: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: "tb_villains",
        freezeTableName: false,
        timestamps: false
    });

    await Villains.sync();
    await Villains.create({ name: "Coringa", power: "Insanidade" });
    const villains = await Villains.findAll();
    console.log("All villains:", villains);



}

main();