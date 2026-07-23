'use strict';

const ProdutoService = require('../services/ProdutoService');

// classe controladora responsável por intermediar as requisições HTTP do cardápio e estoque

class ProdutoController{
    // Rota para cadastro de produtos no cardápio

    async criar(req,res){
        try{
            const novoProduto = await ProdutoService.criarProduto(req.body);

            return res.status(201).json({
                sucesso: true,
                mensagem: 'Produto cadastrado com sucesso!',
                dados: novoProduto
            });
        } catch(error){
            return res.status(400).json({
                sucesso: false,
                erro: error.message
            })
        }
    }

    // rota para listar o cardápio

    async listar(req,res){
        try{
            const produtos = await ProdutoService.listarCardapio();

            return res.status(200).json({
                sucesso: true,
                total: produtos.length,
                dados: produtos
            })
        } catch (error){
            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno ao listar cardápio.'
            })
        }
    }

    // rota para filtrar por categoria

    async listarPorCategoria(req,res){
        try{
            const {categoria} = req.params;
            const produtos = await ProdutoService.listarPorCategoria(categoria);

            return res.status(200).json({
                sucesso: true,
                categoria: categoria.toUpperCase(),
                total: produtos.length,
                dados: produtos
            })
        } catch (error){
            return res.status(400).json({
                sucesso: false,
                erro: error.message
            })
        }
    }

    // rota para reabastecer estoque

    async reabastecer(req,res){
        try{
            const {id} = req.params;
            const {quantidade} = req.body;

            if(!quantidade) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Informe a quantidade a ser adicionada.'
                })
            }

            const produtoAtualizado = await ProdutoService.reabastecerEstoque(id, Number(quantidade));

            return res.status(200).json({
                sucesso: true,
                mensagem: 'Estoque atualizado com sucesso!',
                dados: produtoAtualizado
            });
        } catch (error){
            return res.status(400).json({
                sucesso: false,
                erro: error.message
            })
        }
    }
}

module.exports = new ProdutoController();