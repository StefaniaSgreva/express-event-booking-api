// =======================
//    IMPORTAZIONI
// =======================
// CommonJS
const express = require('express');
const router = express.Router({ mergeParams: true }); // Merge params per accedere a :event
const reservationsController = require('../controllers/reservationsController');

/* Alternativa ES6 Modules (per usarla, aggiungi "type": "module" in package.json):
import express from 'express';
const router = express.Router({ mergeParams: true });
import reservationsController from '../controllers/reservationsController.js';*/

// =========================
//    DEFINIZIONE ROTTE
// =========================

// Elenca tutte le prenotazioni di un evento
router.get('/', reservationsController.index);

// Crea una nuova prenotazione per un evento
router.post('/', reservationsController.store);

// Elimina una prenotazione specifica di un evento
router.delete('/:reservation', reservationsController.destroy);

// =======================
//    ESPORTAZIONI
// =======================
// CommonJS
// Esporta il router usando CommonJS per poterlo usare nel file server.js
module.exports = router;

// ES6
// export default router;
