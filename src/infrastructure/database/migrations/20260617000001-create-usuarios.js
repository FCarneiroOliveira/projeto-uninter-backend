'use strict';

/**@type {import('sequelize-cli').Migration} */

// Criando a tabela usuários com todos os dados pedidos e requisitos 
module.exports = {
      async up (queryInterface, Sequelize) {
        await queryInterface.createTable('usuarios', {
            id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: Sequelize.STRING(150),
                allowNull: false
            },
            email: {
                type: Sequelize.STRING(150),
                allowNull: false,
                unique: true
            },
            senha_hash: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            perfil: {
                type: Sequelize.ENUM('CLIENTE','ATENDENTE','COZINHA','GERENTE'),
                allowNull: false,
                defaultValue: 'CLIENTE'
            },
            consentimento_fidelidade: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            creado_em: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });
    },
    // método down para reverter a alteração caso o comando db:migrate:undo seja executado
     async down (queryInterface, Sequelize) {
        await queryInterface.dropTable('usuarios');
    }
};