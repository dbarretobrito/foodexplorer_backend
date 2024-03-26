// Importações referentes ao JWT
const { verify } = require('jsonwebtoken');
const authJwtConfig = require('../configs/auth');

const AppError = require('../utils/AppError');

async function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  // Verificação a existência do token:
  if (!authHeader) {
    throw new AppError('JWT Token não informado', 401);
  }

  // Caso o token exista, será colocado na posição 1 do array:
  const [, token] = authHeader.split(' ');

  // Verificação se o token é válido (é aqui onde pegamos o id do usuário que está dentro do token de autenticação!)
  try {
    const { sub: user_id } = verify(token, authJwtConfig.jwt.secret);
    request.user = {
      id: Number(user_id),
    };

    return next();
  } catch {
    throw new AppError('JWT Token inválido', 401);
  }
}

module.exports = ensureAuthenticated;
