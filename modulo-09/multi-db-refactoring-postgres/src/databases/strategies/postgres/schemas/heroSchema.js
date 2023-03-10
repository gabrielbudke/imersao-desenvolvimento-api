const { DataTypes } = require("sequelize");

const Hero = {
    name: "Heroes",
    schema: {
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
    },
    options: {
        tableName: "tb_heroes",
        freezeTableName: false,
        timestamps: false
    }
};

module.exports = Hero;