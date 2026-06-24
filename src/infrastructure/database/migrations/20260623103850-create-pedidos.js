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
        type: Sequelize.ENUM('RECEBIDO','EM_PREPARO','PRONTO','ENTREGUE'),
        allowNull: false,
        defaultValue: 'RECEBIDO'
      },
      status_pagamento:{
        type: Sequelize.ENUM('PENDENTE','APROVADO','RECUSADO'),
        allowNull: false,
        defaultValue: 'PENDENTE'
      },
      dados_pagamento:{
        type: Sequelize.TEXT,
        allowNull: true
      },
      criado_em:{
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      atualizado_em:{
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });  
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('pedidos');
  }
};
