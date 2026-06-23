'use strict';

/** @type {import('sequelize-cli').Migration} */

// Estrutura para criação da tabela pedidos 

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('pedidos', {
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // Vincula o pedido ao cliente que comprou
      usuario_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{model:'usuarios', key:'id'},
        onUpdate:'CASCADE',
        onDelete:'RESTRICT'
      },
      valor_total:{
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
        defaultValue: 0.00
      },
      canal_pedido:{
        type: Sequelize.ENUM('BALCAO','TOTEM','APLICATIVO'),
        allowNull: false
      },
      status_pedido:{
        type: Sequelize.ENUM('PENDENTE','EM_PREPARO','PRONTO','ENTREGUE'),
        allowNull: false,
        defaultValue: 'RECEBIDO'
      },

    }
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
