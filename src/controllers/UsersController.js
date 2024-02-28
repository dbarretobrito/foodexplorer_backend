const AppError = require('../utils/AppError');

class UsersController {
  create(request, response) {
    const { name, email, password } = request.body;

    // Fazendo uma validação de campos e utilizando o construtor de AppError
    if (!name) {
      throw new AppError('O nome é obrigatório');
    }

    response.status(201).json({ name, email, password });
  }
}

// Exportando
module.exports = UsersController;
