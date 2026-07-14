'use strict';

// importando o modelo do Produto 
const {Produto} = require('../database/index');


// classe que também vai isolar o Produto das operações de banco de dados e controla as ações de catálogo de itens, preços e estoque

class ProdutoRepository{

    /** Cadastra o novo produto e retorna o mesmo.
     * @param {Object} dadosProduto
     * @returns {Promisse<Object>}
     */
    async criar(dadosProduto){
        return await Produto.create(dadosProduto);
    }

    /** Busca o produto pelo id
     * @param {number} id
     * @returns {Promise<Object|null>}
     */
    async buscarPorId(id){
        return await Produto.findByPk(id);
    }

    /** Lista todos os produtos
     * @returns {Promise<Array>}
     */
    async listarTodos(){
        return await Produto.findAll();
    }

    /** Para filtrar os produtos por categoria
     * @param {string} categoria
     * @returns {Promise<Array>}
     */
    async listarPorCategoria(categoria){
        return await Produto.findAll({where: {categoria}});
    }

    /** Atualiza a quantidade do produto no estoque
     * @param {number} id
     * @param {number} novaQuantidade
     * @returns {Promise<Object>}
     */

    async atualizarEstoque(id, novaQuantidade){
        const produto = await Produto.findByPk(id);
        if (!produto){
            throw new Error('Produto não foi encontrado')
        }

        produto.quantidade_estoque = novaQuantidade;
        return await produto.save()
    }
}

module.exports = new ProdutoRepository();