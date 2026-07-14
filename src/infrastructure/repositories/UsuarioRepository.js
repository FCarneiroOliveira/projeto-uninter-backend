'use strict';

// importando o modelo usuario que foi conectado e centralizado
const {Usuario} = require('../database/index')


// classe para isolar o acesso ao banco de dados para o Usuario, usando o padrão Repository

class UsuarioRepository{
    /** Salva o usuário novo no banco de dados
    * @param {Object} dadosUsuario
    * @returns {Promise<Object>}
    */
    async criar(dadosUsuario){
        return await Usuario.create(dadosUsuario);
    }

    /** Busca o usuário pelo id
     * @param {number} id
     * @returns {Promise<Object>|null>}
     */
    async buscarPorId(id){
        return await Usuario.findByPk(id);
    }

    /** Busca o usuário pelo email
     * @param {string} email
     * @returns {Promise<Object|null>}
     */
    async buscarPorEmail(email){
        return await Usuario.findOne({where: {email}});
    }

    /**
     * Lista todos os usuários cadastrados
     * @returns {Promise<Array>}
     */

    async listarTodos(){
        return await Usuario.findAll();
    }
}

module.exports = new UsuarioRepository()