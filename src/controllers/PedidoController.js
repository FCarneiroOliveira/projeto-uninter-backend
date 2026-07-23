'use strict';

const PedidoService = require('../services/PedidoService');

// classe controladora reponsável por intermediar as requisições HTTP do fluxo de vendas e pedidos

class PedidoController{

    // rota para fazer um novo pedido

    async criar(req,res){
        try{
            const novoPedido = await PedidoService.realizarPedido(req.body);

            return res.status(201).json({
                sucesso: true,
                mensagem: 'Pedido feito e enviado com sucesso!',
                dados: novoPedido
            })
        } catch (error){
            return res.status(400).json({
                sucesso: false,
                erro: error.message
            })
        }
    }

    // rota para listar todos os pedidos

    async listarTodos(req,res){
        try{
            const pedidos = await PedidoService.listarTodosPedidos();

            return res.status(200).json({
                sucesso: true,
                total: pedidos.length,
                dados: pedidos
            })
        } catch (error){
            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno ao listar os pedidos.'
            })
        }
    }

    // rota para consultar histórico de compras de um cliente específico

    async historicoCliente(req,res){
        try{
            const {usuarioId} = req.params;
            const pedidos = await PedidoService.buscarHistoricoDoCliente(usuarioId);

            return res.status(200).json({
                sucesso: true,
                usuario_id: Number(usuarioId),
                total_pedidos: pedidos.length,
                dados: pedidos
            });
        } catch (error){
            return res.status(400).json({
                sucesso: false,
                erro: error.message
            });
        }
    }

    // rota para atualizar o progresso da cozinha

    async atualizarStatus(req,res){
        try{
            const {id} = req.params;
            const {status_pedido} = req.body;

            if(!status_pedido){
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Informe o novo Status do pedido(RECEBIDO,EM_PREPARO,PRONTO ou ENTREGUE)'
                });
            }

            const pedidoAtualizado = await PedidoService.atualizarProgresso(id, status_pedido);

            return res.status(200).json({
                sucesso: true,
                mensagem: 'Status do pedido atualizado com sucesso!',
                dados: pedidoAtualizado
            });
        } catch (error){
            return res.status(400).json({
                sucesso: false,
                erro: error.message
            });
        }
    }

    // rota para atualizar pagamento

    async atualizarPagamento(req,res){
        try{
            const {id} = req.params;
            const {status_pagamento, comprovante} = req.body;

            if(!status_pagamento){
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Informe o novo Status do pagamento(PENDENTE,APROVADO ou RECUSADO)'
                });
            }

            const pedidoAtualizado = await PedidoService.atualizarPagamento(id, status_pagamento, comprovante);

            return res.status(200).json({
                sucesso: true,
                mensagem: 'Status do pagamento atualizado com sucesso!',
                dados: pedidoAtualizado
            });
        } catch (error){
            return res.status(400).json({
                sucesso: false,
                erro: error.message
            });
        }
    }
}
module.exports = new PedidoController();