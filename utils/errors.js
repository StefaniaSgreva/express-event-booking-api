/**
 * Classe base per errori personalizzati con codice HTTP
 */
class AppError extends Error {
  /**
   * @param {string} message Messaggio di errore
   * @param {number} statusCode Codice HTTP da ritornare
   */
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    // Mantieni la traccia dello stack corretta
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Errore 404 - Risorsa non trovata
 */
class NotFoundError extends AppError {
  constructor(message = 'Risorsa non trovata') {
    super(message, 404);
  }
}

/**
 * Errore 400 - Validazione input non valida
 */
class ValidationError extends AppError {
  constructor(message = 'Errore di validazione') {
    super(message, 400);
  }
}

/**
 * Errore 409 - Conflitto su risorsa già esistente
 */
class ConflictError extends AppError {
  constructor(message = 'Conflitto sulla risorsa') {
    super(message, 409);
  }
}

// Esportazione delle classi errori personalizzati
module.exports = {
  AppError,
  NotFoundError,
  ValidationError,
  ConflictError,
};
