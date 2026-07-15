'use strict';

const {Pedido, Usuario} = require('../database/index');

class PedidoRepository{

    /** Registra o novo pedido no banco de dados
     * @param {Object} dadosPedido
     * @returns {Promise<Object>}
     */

    async criar(dadosPedido){
        return await Pedido.create(dadosPedido);
    }

    /** Busca o pedido pelo id
     * @param {number} id
     * @returns {Promise<Object|null>}
     */

    async buscarPorId(id){
        return await Pedido.findByPk(id,{
            include:[{model: Usuario, as: 'cliente', attributes:['id','nome','email']}]
        })
    }

    /** Lista todos os pedidos do sistema e os seus dados
     * @returns {Promise<Array>}
     */

    async listarTodos(){
        return await Pedido.findAll({
            include:[{model: Usuario, as:'cliente', attributes:['id','nome','email']}],
            order:[['criado_em','DESC']]
        })
    }

    /** Busca os pedidos feito por um cliente específico
     * @param {number} usuarioId
     * @returns {Promise<Array>}
     */

    async buscarPorCliente(usuarioId){
        return await Pedido.findAll({
            where: {usuario_id: usuarioId},
            order: [['criado_em','DESC']]
        });
    }

    /** Atualiza o status do progresso da produção do pedido
     * @param {number} id
     * @param {string} novoStatusPedido
     * @returns {Promise<Object>}
     */

    async atualizarStatusPedido(id, novoStatusPedido){
        const pedido = await Pedido.findByPk(id);
        if (!pedido){
            throw new Error('Não foi possivel atualizar pedido. Pedido não encontrado!')
        }

        pedido.status_pedido = novoStatusPedido;
        return await pedido.save()
    }

    /** Atualiza o status do pagamento
     * @param {number} id
     * @param {string} novoStatusPagamento
     * @param {string}
     * @returns {Promise<Object>}
     */

    async atualizarStatusPagamento(id, novoStatusPagamento,dadosPagamento = null) {
        const pedido = await Pedido.findByPk(id);
        if(!pedido){
            throw new Error('Pedido não encontrado. Não foi possivel atualizar o pagamento.');
        }

        return await pedido.save()
    }
}

module.exports = new PedidoRepository();