'use strict';

const bcrypt = require('bcryptjs');
const UsuarioRepository = require('../infrastructure/repositories/UsuarioRepository');

// Classe de serviço responsável por aplicar as regras de negócio dos usuários e também gerencia as senhas e validações de cadastro

class UsuarioService{

    // Cadastra o usuário criptografando sua senha e valida o email

    async cadastrar(dadosUsuario){
        const usuarioExistente = await UsuarioRepository.buscarPorEmail(dadosUsuario.email);
        if (usuarioExistente) {
            throw new Error('Email já cadastrado.')
        }

        const salt = await bcrypt.genSalt(10);
        const senhaCriptografada = await bcrypt.hash(dadosUsuario.senha, salt);

        const novoUsuario = {
            nome: dadosUsuario.nome,
            email: dadosUsuario.email,
            senha_hash: senhaCriptografada,
            perfil: dadosUsuario.perfil || 'CLIENTE',
            consentimento_fidelidade: dadosUsuario.consentimento_fidelidade || false
        };
        return await UsuarioRepository.criar(novoUsuario);
    }

    // Auntenticação do login do usuário

    async autenticar(email, senha){

        const usuario = await UsuarioRepository.buscarPorEmail(email);
        if (!usuario){
            throw new Error('Email ou senha incorretos.')
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
        if (!senhaValida){
            throw new Error('Email ou senha incorretos.')
        }

        const usuarioRetorno = usuario.toJSON();
        delete usuarioRetorno.senha_hash;
        return usuarioRetorno;
    }

    // obtém o perfil do usuário por id

    async obterPorId(id){
        const usuario = await UsuarioRepository.buscarPorId(id);
        if (!usuario){
            throw new Error('Usuário não encontrado.');
        }

        const usuarioRetorno = usuario.toJSON();
        delete usuarioRetorno.senha_hash;
        return usuarioRetorno;
    }
}

module.exports = new UsuarioService();
