const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user',
    {
        username: {type: DataTypes.STRING, primaryKey: true, allowNull: false},
        password: {type: DataTypes.STRING, allowNull: false},
        role: {type: DataTypes.STRING, allowNull: false}
    },
    {
        hooks: {
            beforeCreate: async (user) => {
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(user.password, saltRounds);
                user.password = hashedPassword;
            }
        },
        paranoid: true,
        timestamps: false
    });
    return User;
}