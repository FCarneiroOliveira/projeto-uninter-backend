'use strict';

// importando o modelo usuario que foi conectado e centralizado
const {Usuario} = require('../database/index')


// classe para isolar o acesso ao banco de dados para o Usuario, usando o padrão Repository

class UsuarioRepository{
    /** 
    * @param {Object} dadosUsuario
    * @returns {Promise<Object>}
    */
    async criar(dadosUsuario){
        return await Usuario.create(dadosUsuario)
    }

    /**
     * @param {number} id
     * @returns {Promise<Object>|null}
     */
    async buscarPorEmail(email){
        return await Usuario.findOne({where:{email}});
    }

    /**
     * @returns {Promise<Array>}
     */
    async listarTodos(){
        return await Usuario.findAll();
    }
}

module.exports = new UsuarioRepository()