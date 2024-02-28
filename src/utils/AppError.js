class AppError {
  message;
  statusCode;

  constructor(message, statusCode = 400) {
    // O this transfere a message que chega pelo construtor para o message que faz parte do contexto global
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
