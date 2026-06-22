'use strict';

 /**@type {import('sequelize-cli').Migration} */

 // Criação da tabela produtos com os dados requeridos e requisitos funcionais
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('produtos', {
      id:{
        allowNull: false,
        autoIncrement: True,
        primaryKey: true,
        type: Sequelize.INTEGER
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
