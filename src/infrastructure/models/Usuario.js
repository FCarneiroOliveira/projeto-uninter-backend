'use strict';

const { Model, DataTypes } = require('sequelize');

// Classe da tabela usuários no mapeamento sequelize, conforme as regras de validação de dados e LGPD

class Usuario extends Model{
    static init(sequelize){
        super.init({
            nome: {
                type: DataTypes.STRING(150),
                allowNull: false,
                validade:{
                    notEmpty: {msg: "O nome não pode ser enviado vazio."}
                }
            },
            email:{
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: {msg: "Este e-mail já possui cadastrado no sistema."},
                validade:{
                    isEmail: {msg: "Insira um formato válido de e-mail."}
                }
            },
            senha_hash:{
                type: DataTypes.STRING(255),
                allowNull: false
            },
            perfil:{
                type: DataTypes.ENUM('CLIENTE','ATENDENTE','COZINHA','GERENTE'),
                allowNull: false,
                defaultValue: 'CLIENTE'
            },
            consentimento_fidelidade:{
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
    }, {
        sequelize,
        tableName: 'usuarios',
        underscored: true,
        timestamps:true,
        createdAt: 'criado_em',
        updatedAt: 'atualizado_em'
    });
    return this;
 }

 // método 'associate' para relacionar o utilizador aos pedidos e o mesmo pode ter vários pedidos
    static associate(models){
        this.hasMany(models.Pedido, {foreignKey: 'usuario_id', as: 'pedidos'});
    }
}

module.exports = Usuario;