import { DataTypes, Model } from "sequelize";

class User extends Model {
    static init(connection) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
        }, {
            sequelize: connection,
            freezeTableName: true,
            timestamps: false,
        });
    }
}

export default User;