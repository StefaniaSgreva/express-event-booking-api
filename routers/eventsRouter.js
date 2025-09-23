// =======================
//    IMPORTAZIONI
// =======================
// CommonJS
// Importa Express e crea un'istanza di router
const express = require("express");
const router = express.Router();
// Importa il controller degli eventi che contiene la logica delle rotte
const eventsController = require("../controllers/eventsController");

/* Alternativa ES6 Modules (per usarla, aggiungi "type": "module" in package.json):
import express from 'express';
const router = express.Router();
import eventsController from '../controllers/eventsController.js';*/

// =========================
//    DEFINIZIONE DELLE ROTTE
// =========================

// elencare gli eventi
router.get("/", eventsController.index); 
// creare un nuovo evento
router.post("/", eventsController.store);
// aggiornare un evento specifico identificato da event
router.put("/:event", eventsController.update);


// =======================
//    ESPORTAZIONI
// =======================
// CommonJS
// Esporta il router usando CommonJS per poterlo usare nel file server.js
module.exports = router;

// ES6
// export default router;