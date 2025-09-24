// =======================
//    IMPORTAZIONI
// =======================
// CommonJS
// Importa Express e crea un'istanza di router
const express = require("express");
const router = express.Router();
// Importa il controller degli eventi che contiene la logica delle rotte
const eventsController = require("../controllers/eventsController");
const reservationsRouter = require('./reservationsRouter');

/* Alternativa ES6 Modules (per usarla, aggiungi "type": "module" in package.json):
import express from 'express';
const router = express.Router();
import eventsController from '../controllers/eventsController.js';
import reservationsRouter from './reservationsRouter';*/

// =========================
//    DEFINIZIONE ROTTE
// =========================

// elencare gli eventi
router.get("/", eventsController.index); 
// visualizza un singolo evento
router.get("/:id", eventsController.show);
// creare un nuovo evento
router.post("/", eventsController.store);
// aggiornare un evento specifico identificato da event
router.put('/:id', eventsController.update);

// Usa il router prenotazioni per la route annidata events/:id/reservations
router.use('/:event/reservations', reservationsRouter);

// =======================
//    ESPORTAZIONI
// =======================
// CommonJS
// Esporta il router usando CommonJS per poterlo usare nel file server.js
module.exports = router;

// ES6
// export default router;