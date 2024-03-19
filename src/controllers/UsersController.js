const { hash } = require('bcryptjs');

const AppError = require('../utils/AppError');

const sqliteConnection = require('../database/sqlite');

class UsersController {
  async create(request, response) {
    // Parâmetros enviados pelo body
    const { name, email, password } = request.body;

    // Conexão com o banco de dados
    const database = await sqliteConnection();

    // Conferindo a criação de usuários existentes
    // Conferência para saber se o usuário já existe no db
    const checkUserExist = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email]
    );
    // Agora com o retorno no db, se faz a condição
    if (checkUserExist) {
      throw new AppError('Este e-mail já está em uso');
    }

    const hashedPassword = await hash(password, 8);

    // CRIANDO O USUÁRIO
    // Inserção de dados
    await database.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    return response.status(201).json();
  }
}

// Exportando
module.exports = UsersController;
