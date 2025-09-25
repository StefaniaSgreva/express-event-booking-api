// =======================
//     IMPORTAZIONI
// =======================
const Reservation = require('../models/reservation');
const Event = require('../models/event'); // Mancava import Event per il controllo data
const { NotFoundError, ValidationError, ConflictError } = require('../utils/errors');

// ES6 Modules
// import Reservation from '../models/reservation.js';
// import Event from '../models/event.js';

// =======================
//     FUNZIONI
// =======================

/**
 * Elenca tutte le prenotazioni relative a un evento specifico (eventId tramite parametri URL)
 * @param {Request} req 
 * @param {Response} res 
 */
function index(req, res, next) {
  try {
    const eventId = req.params.event;

    // Controllo presenza eventId
    if (!eventId) {
      throw new ValidationError('ID evento richiesto');
    }

    // Legge tutte le prenotazioni dal file
    const allReservations = Reservation.readAll();

    // Filtra le prenotazioni solo per evento richiesto
    const filtered = allReservations.filter(r => r.eventId === eventId);

    // Risponde con la lista filtrata
    res.json(filtered);

  } catch (err) {
    next(err);
  }
}

/**
 * Crea una nuova prenotazione per un evento specifico
 * @param {Request} req 
 * @param {Response} res 
 */
function store(req, res, next) {
  try {
    const eventId = req.params.event;

    // Recupera l'evento per controllare la data
    const event = Event.findById(eventId);
    if (!event) {
      throw new NotFoundError('Evento non trovato');
    }

    // Verifica se l'evento è già passato (data evento < data odierna)
    if (new Date(event.date) < new Date()) {
      throw new ValidationError('Non è possibile aggiungere prenotazioni a un evento già passato');
    }

    const { id, firstName, lastName, email } = req.body;

    // Controlla che tutti i campi obbligatori siano presenti
    if (!id || !firstName || !lastName || !email) {
      throw new ValidationError('Tutti i campi id, firstName, lastName e email sono obbligatori');
    }

    const reservations = Reservation.readAll();

    // Controlla duplicato id prenotazione
    if (reservations.find(r => r.id === id)) {
      throw new ConflictError('Prenotazione con questo ID esiste già');
    }

    // Crea nuova istanza prenotazione
    const newReservation = new Reservation({
      id,
      firstName,
      lastName,
      email,
      eventId,
    });

    // Aggiunge prenotazione all'elenco
    reservations.push(newReservation);

    // Salva le prenotazioni aggiornate su file
    Reservation.saveAll(reservations);

    // Risponde con la nuova prenotazione e codice 201 Created
    res.status(201).json(newReservation);

  } catch (err) {
    next(err);
  }
}

/**
 * Elimina una prenotazione per un evento specifico tramite id prenotazione 
 * @param {Request} req 
 * @param {Response} res 
 */
function destroy(req, res, next) {
  try {
    const eventId = req.params.event;
    const reservationId = req.params.reservation;

    // Recupera evento per controllare validità e data
    const event = Event.findById(eventId);
    if (!event) {
      throw new NotFoundError('Evento non trovato');
    }

    // Blocca se evento passato
    if (new Date(event.date) < new Date()) {
      throw new ValidationError('Non è possibile rimuovere prenotazioni da un evento già passato');
    }

    const reservations = Reservation.readAll();

    // Cerca indice prenotazione da eliminare relativo a evento specifico
    const index = reservations.findIndex(r => r.id === reservationId && r.eventId === eventId);

    if (index === -1) {
      throw new NotFoundError('Prenotazione non trovata per questo evento');
    }

    // Rimuove la prenotazione dall'elenco
    reservations.splice(index, 1);

    // Salva l'elenco aggiornato su file
    Reservation.saveAll(reservations);

    // Risponde con status 204 No Content
    res.status(204).send();

  } catch (err) {
    next(err);
  }
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
