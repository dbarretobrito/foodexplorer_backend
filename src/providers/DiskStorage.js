// Importações para lidar com manipulação de arquivos e diretórios
const fs = require('fs');
const path = require('path');

// Import de arquivo de configuração
const uploadConfig = require('../configs/upload');

class DiskStorage {
  async saveFile(file) {
    await fs.promises.rename(
      // Arquivo na posição "inicial"
      path.resolve(uploadConfig.TMP_FOLDER, file),

      // Arquivo na posição "final"
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    );

    return file;
  }

  async deleteFile(file) {
    // Buscando o endereço do arquivo
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);

    // Tratando
    try {
      // Caso exista:
      await fs.promises.stat(filePath);
    } catch {
      // Se der algo errado, apenas encerra.
      return;
    }
    // Deletando
    await fs.promises.unlink(file);
  }
}

module.exports = DiskStorage;
