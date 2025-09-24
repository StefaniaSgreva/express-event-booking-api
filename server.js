// =======================
//    IMPORTAZIONI
// =======================
const express = require('express');
const app = express();
// Importo e Avvio libreria dotenv su una sola riga 
require('dotenv').config();

const eventsRouter = require('./routers/eventsRouter');
app.use(express.json()); // per gestire body JSON

// =========================
//    DEFINIZIONE DELLE ROTTE
// =========================

// Rotte degli eventi
app.use('/events', eventsRouter);

// Middleware per gestire errori 404 - rotta non trovata
app.use((req, res, next) => {
  res.status(404).json({ error: '404 - Risorsa non trovata' });
});

// Middleware generico per errori 500 - errore interno server
app.use((err, req, res, next) => {
  console.error(err.stack);  // Log dell’errore per debug
  res.status(500).json({ error: '500 - Internal Server Error' });
});

// =======================
//    AVVIO DEL SERVER
// =======================
// Imposta la porta letta da variabili d'ambiente, oppure fallback su 3000
const port = process.env.PORT || 3000;

// Avvia il server HTTP Express e stampa in console l'url su cui è in ascolto
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
