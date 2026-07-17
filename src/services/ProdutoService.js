'use strict';

const ProdutoRepository = require('../infrastructure/repositories/ProdutoRepository');

// classe de serviço responsável pelas regras de negócio dos produtos

class ProdutoService{
    
    // cadastra um novo produto após validar as regras financeiras e de estoque

    async criarProduto(dadosProduto){

        if (Number(dadosProduto.preco) <= 0) {
            throw new Error('O preço deve ser maior que zero.')
        }
        if (dadosProduto.quantidade_estoque < 0){
            throw new Error('A quantidade em estoque não pode ser menor que zero.')
        }

        return await ProdutoRepository.criar(dadosProduto);
    }

    // retorna o cardápio da lanchonete

    async listarCardapio(){
        return await ProdutoRepository.listarTodos();
    }

    // retorna o cardápio filtrado por categoria

    async listarPorCategoria(categoria){
        const categoriasValidas = ['LANCHE', 'BEBIDA', 'ACOMPANHAMENTO', 'SOBREMESA'];

        if (!categoriasValidas.includes(categoria.toUpperCase())){
            throw new Error('Categoria inválida para a consulta');
        }
        return await ProdutoRepository.listarPorCategoria(categoria.toUpperCase());
    }

    // adiciona ou repõe itens no estoque

    async reabastecerEstoque(produtoId, quantidadeParaAdicionar){
        if (quantidadeParaAdicionar <= 0){
            throw new Error('A quantidade deve ser maior que zero.')
        }

        const produto = await ProdutoRepository.buscarPorId(produtoId);
        if (!produto){
            throw new Error('Produto não encontrado.');
        }

        const novoEstoque = produto.quantidade_estoque + quantidadeParaAdicionar;
        return await ProdutoRepository.atualizarEstoque(produtoId, novoEstoque);
    }
}

module.exports = new ProdutoService();