'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
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
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('usuarios');
    }
};