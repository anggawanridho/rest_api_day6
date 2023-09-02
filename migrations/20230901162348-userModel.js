'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('users', {
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

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('users');
  }
};
