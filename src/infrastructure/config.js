// módulo 'path' para gerenciar caminhos dos arquivos
const path = require('path');

// Exportação das configurações separadas por ambientes de execução
module.exports = {
  
  development: {
    
    dialect: 'sqlite',
    
    storage: path.join(__dirname, 'database', 'database.sqlite'),
  
    logging: false
  },

  production: {
    dialect: 'sqlite',
    storage: path.join(__dirname, 'database', 'database.sqlite'),
    logging: false
  }
};