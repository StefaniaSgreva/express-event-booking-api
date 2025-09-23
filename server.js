// =======================
//    IMPORTAZIONI
// =======================
const express = require('express');
const app = express();
// Importo e Avvio libreria dotenv su una sola riga 
require('dotenv').config();

// =========================
//    DEFINIZIONE DELLE ROTTE
// =========================


// =======================
//    AVVIO DEL SERVER
// =======================
// Imposta la porta letta da variabili d'ambiente, oppure fallback su 3000
const port = process.env.PORT || 3000;

// Avvia il server HTTP Express e stampa in console l'url su cui è in ascolto
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
