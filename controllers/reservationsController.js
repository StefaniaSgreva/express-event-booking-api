// =======================
//     IMPORTAZIONI
// =======================
const Reservation = require('../models/reservation');

// ES6 Modules
// import Reservation from '../models/reservation.js';

// =======================
//     FUNZIONI
// =======================

/**
 * Elenca tutte le prenotazioni relative a un evento specifico (eventId tramite parametri URL)
 * @param {Request} req 
 * @param {Response} res 
 */
function index(req, res) {
  const eventId = req.params.event;
  if (!eventId) {
    return res.status(400).json({ error: 'ID evento richiesto' });
  }

  // Leggi tutte le prenotazioni
  const allReservations = Reservation.readAll();

  // Filtra per eventId
  const filtered = allReservations.filter(r => r.eventId === eventId);

  res.json(filtered);
}

/**
 * Crea una nuova prenotazione per un evento specifico
 * @param {Request} req 
 * @param {Response} res 
 */
function store(req, res) {
  try {
    const eventId = req.params.event;
    if (!eventId) {
      return res.status(400).json({ error: 'ID evento richiesto' });
    }

    // Prendi dati dal body e aggiungi eventId dal params
    const { id, firstName, lastName, email } = req.body;

    // Validazione preliminare semplice
    if (!id || !firstName || !lastName || !email) {
      return res.status(400).json({ error: 'Tutti i campi id, firstName, lastName e email sono obbligatori' });
    }

    const reservations = Reservation.readAll();

    // Verifica id prenotazione duplicato
    if (reservations.find(r => r.id === id)) {
      return res.status(409).json({ error: 'Prenotazione con questo ID esiste già' });
    }

    // Crea nuova istanza con validazione automatica tramite setter
    const newReservation = new Reservation({
      id,
      firstName,
      lastName,
      email,
      eventId,
    });

    reservations.push(newReservation);
    Reservation.saveAll(reservations);

    res.status(201).json(newReservation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

/**
 * Elimina una prenotazione tramite id specifico associato a un evento
 * @param {Request} req 
 * @param {Response} res 
 */
function destroy(req, res) {
  const eventId = req.params.event;
  const reservationId = req.params.reservation;

  if (!eventId || !reservationId) {
    return res.status(400).json({ error: 'ID evento e prenotazione richiesti' });
  }

  const reservations = Reservation.readAll();

  const index = reservations.findIndex(r => r.id === reservationId && r.eventId === eventId);

  if (index === -1) {
    return res.status(404).json({ error: 'Prenotazione non trovata per questo evento' });
  }

  // Rimuovi prenotazione dall'array
  reservations.splice(index, 1);

  // Salva file aggiornato
  Reservation.saveAll(reservations);

  res.status(204).send(); // No content
}

// =======================
//     ESPORTAZIONI
// =======================
// CommonJS export
module.exports = {
  index,
  store,
  destroy,
};

// ES6 Modules
// export default { index, store, destroy };
