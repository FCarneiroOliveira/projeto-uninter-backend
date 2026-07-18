'use strict'

const UsuarioService = require('../services/UsuarioService');

// classe controladora responsável por receber as requisições HTTP e a lógica de negócios de usuários

class UsuarioController{
    // Rota de cadastro do usuário

    async cadastrar(req,res){
        try{
            const novoUsuario = await UsuarioService.cadastrar(req.body);

            return res.status(201).json({
                sucesso:true,
                mensagem:'Usuário cadastrado com sucesso!',
                dados:{
                    id: novoUsuario.id,
                    nome: novoUsuario.nome,
                    email: novoUsuario.email,
                    perfil: novoUsuario.perfil
                }
            });
        } catch(error){
            return res.status(400).json({
                sucesso: false,
                erro: error.message
            })
        }
    }

    // rota de login

    async login(req,res){
        try {
            const {email, senha} = req.body;

            if (!email || !senha){
                return res.status(400).json({ sucesso: false, erro:'Email e senha obrigatórios!'});
            }

            const usuario = await UsuarioService.autenticar(email,senha);

            return res.status(200).json({
                sucesso: true,
                mensagem: 'Login realizado com sucesso!',
                usuario
            });
        } catch (error){
            return res.status(401).json({
                sucesso: false,
                erro: error.message
            })
        }
    }

    // rota para obter perfil pelo ID

    async obterPerfil(req,res){
        try{
            const {id} = req.params;
            const usuario = await UsuarioService.obterPorId(id);

            return res.status(200).json({
                sucesso: true,
                dados: usuario
            });
        } catch (error){
            return res.status(404).json({
                sucesso: false,
                erro: error.message
            });
        }
    }
}
 // importando uma instância da classe para usar no arquivo de rotas
module.exports = new UsuarioController();