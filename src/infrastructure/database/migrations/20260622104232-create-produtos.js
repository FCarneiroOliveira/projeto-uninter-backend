'use strict';

 /**@type {import('sequelize-cli').Migration} */

 // Estrutura para criação da tabela produtos com os dados requeridos e requisitos funcionais
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('produtos', {
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome:{
        type: Sequelize.STRING(100),
        allowNull: false
      },
      descricao:{
        type: Sequelize.TEXT,
        allowNull: true
      },
      preco:{
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      categoria:{
        type: Sequelize.ENUM('LANCHE','BEBIDA','ACOMPANHAMENTO','SOBREMESA'),
        allowNull: false
      },
      quantidade_estoque:{
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
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
    await queryInterface.dropTable('produtos');
  }
};
