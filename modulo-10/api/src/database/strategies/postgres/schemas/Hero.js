import { DataTypes, Model } from "sequelize";

class Hero extends Model {
    static init(connection) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
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
            sequelize: connection,
            freezeTableName: true,
            timestamps: false,
        });
    }
}

export default Hero;