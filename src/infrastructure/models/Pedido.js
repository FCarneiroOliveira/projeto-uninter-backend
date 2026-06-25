'use strict';

const { Model, DataTypes } = require('sequelize');

// Classe da tabela pedidos com informações de vendas, canais de atendimento e o vínculo com o cliente.

class Pedido extends Model {
  static init(sequelize) {
    super.init({
      valor_total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
      },
      canal_pedido: {
        type: DataTypes.ENUM('BALCAO', 'TOTEM', 'APLICATIVO'),
        allowNull: false
      },
      status_pedido: {
        type: DataTypes.ENUM('RECEBIDO', 'EM_PREPARO', 'PRONTO', 'ENTREGUE'),
        allowNull: false,
        defaultValue: 'RECEBIDO'
      },
      status_pagamento: {
        type: DataTypes.ENUM('PENDENTE', 'APROVADO', 'RECUSADO'),
        allowNull: false,
        defaultValue: 'PENDENTE'
      },
      dados_pagamento: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'pedidos',
      underscored: true,
      timestamps: true,
      createdAt: 'criado_em',
      updatedAt: 'atualizado_em'
    });

    return this;
  }

  // Faz o vínculo de relacionamento do banco de dados e também os pedidos serem de um único usuário.
  static associate(models) {
    this.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'cliente' });
  }
}

module.exports = Pedido;