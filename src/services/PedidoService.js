'use strict';

const PedidoRepository = require('../infrastructure/repositories/PedidoRepository');
const ProdutoRepository = require('../infrastructure/repositories/ProdutoRepository');

// classe responsável pelas regras de negócio dos pedidos

class PedidoService {
    /** cria um pedido e atualiza o estoque
     *  @param {Object} dadosPedido
     */ 

    async realizarPedido(dadosPedido){
        const {usuario_id, produto_id, quantidade, canal_pedido} = dadosPedido;

        if (!quantidade || quantidade <= 0){
            throw new Error('A quantidade do produto deve ser maior que zero.');
        }

        const produto = await ProdutoRepository.buscarPorId(produto_id);
        if (!produto){
            throw new Error('Produto não existe no cardápio.')
        }

        const valorTotal = Number(produto.preco) * quantidade;

        const novoEstoque = produto.quantidade_estoque - quantidade;
        await ProdutoRepository.atualizarEstoque(produto_id, novoEstoque);

        const novoPedido = {
            usuario_id,
            valor_total: valorTotal,
            canal_pedido: canal_pedido || 'BALCAO',
            status_pedido: 'RECEBIDO',
            status_pagamento: 'PENDENTE',
            dados_pagamento: `item: ${produto.nome} | Qtd: ${quantidade} | Preço Unitário: R$ ${produto.preco}`
        };
        return await PedidoRepository.criar(novoPedido);
    }

    // atualiza o andamento do pedido na cozinha

    async atualizarProgresso(pedidoId, novoStatus){
        const statusValidos = ['RECEBIDO', 'EM_PREPARO', 'PRONTO', 'ENTREGUE'];
        if (!statusValidos.includes(novoStatus.toUpperCase())){
            throw new Error('Status de progresso inválido.');
        }
        return await PedidoRepository.atualizarStatusPedido(pedidoId, novoStatus.toUpperCase());
    }

    // atualiza a situação financeira do após a resposta do gateway de pagamento.

    async atualizarPagamento(pedidoId, novoStatusPagamento, comprovante){
        const statusValidos = ['PENDENTE', 'APROVADO', 'RECUSADO'];
        if (!statusValidos.includes(novoStatusPagamento.toUpperCase())){
            throw new Error('Status de pagamento inválido.');
        }
        return await PedidoRepository.atualizarStatusPagamento(pedidoId, novoStatusPagamento.toUpperCase(), comprovante);
    }

    // lista todos os pedidos pendentes e concluídos

    async listarTodosPedidos(){
        return await PedidoRepository.listarTodos();
    }

    async buscarHistoricoDoCliente(usuarioId){
        return await PedidoRepository.buscarPorCliente(usuarioId);
    }
}

module.exports = new PedidoService();