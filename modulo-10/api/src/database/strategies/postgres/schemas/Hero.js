import { DataTypes, Model } from "sequelize";

class Hero extends Model {
    static init(connection) {
        super.init({
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
            timestamps: false,
        });

        // await Hero.sync();
    }
}

export default Hero;