'use strict';

const Sequelize = require('sequelize');

// Importa as configurações do banco de dados
const config = require('../config/config.json')

// Importando todos os models que foi criado
const Usuario = require('../models/Usuario');
const Produto = require('../models/Produto');
const Pedido = require('../models/Pedido');

// Agrupando todos os models para facilitar a inicialização 
const models = [Usuario, Produto, Pedido];

// Verificando o ambiente que irá desenvolver
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

let sequelize;
// Iniciando a conexão com Sequelize usando as configs do arquivo json
if (dbConfig.use_env_variable) {
    sequelize = new Sequelize(process.env[dbConfig.use_env_variable], dbConfig);
} else{
    sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
}

// Percorre todos os models e faz as associações
models.forEach(model => {
    if (model.associate) {
        model.associate(sequelize.models);
    }
});

// exportando todas as conexões e modelos prontos para serem usado no sistema
module.exports = {
    sequelize,
    Usuario,
    Produto,
    Pedido
}