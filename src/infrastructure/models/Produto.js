'use strict';

const { Model, DataTypes } = require('sequelize');

// Classe da tabela produtos, com todas as regras do negócio, validação do cardápio e controle do estoque.

class Produto extends Model{
    static init(sequelize){
        super.init({
            nome:{
                type: Datatypes.STRING(100),
                allowNull: false,
                validate:{
                    notEmpty: {msg: "Deve colocar o nome do produto!"}
                }        
            },
            descricao:{
                type: Datatypes.TEXT,
                allowNull: true
            },
            preco:{
                type: Datatypes.DECIMAL(10,2),
                allowNull: false,
                validate:{
                    isDecimal: {msg: "O preço deve conter apenas números válidos!"},
                    min: {args: [0.00], msg: "O preço não pode ter números negativos!"}
                }
            },
            categoria:{
                type: Datatypes.ENUM('LANCHE','BEBIDA','ACOMPANHAMENTO','SOBREMESA'),
                allowNull: false,
                validate:{
                   isIn:{
                    args:[['LANCHE','BEBIDA','ACOMPANHAMENTO','SOBREMESA']],
                    msg: "Categoria de produto inválida!"
                   }
                }
            },
            quantidade_estoque:{
                type: Datatypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
                validate:{
                    isInt: {msg: "A quantidade deve ser números inteiros!"},
                    min: {args: [0], msg: "O estoque não pode ser negativo."}
                }
            }
        },{
            sequelize,
            tableName: 'produtos',
            underscored: true,
            timestamps: true,
            createdAt: 'criado_em',
            updatedAt: 'atualizado_em'
        });

        return this;
    }
    static associate(models){

    }
}

module.exports = Produto;
