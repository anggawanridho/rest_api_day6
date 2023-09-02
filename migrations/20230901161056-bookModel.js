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
    await queryInterface.createTable('books', {
        idBuku: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
        namaBuku: { type: DataTypes.STRING, allowNull: false },
        kategoriBuku: { type: DataTypes.STRING, defaultValue: 'Belum diisi' },
        deskripsiBuku: { type: DataTypes.TEXT, defaultValue: 'Deskripsi default' }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('books');
  }
};
