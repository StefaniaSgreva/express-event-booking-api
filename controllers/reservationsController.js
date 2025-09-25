// =======================
//     IMPORTAZIONI
// =======================
const Reservation = require('../models/reservation');
const { NotFoundError, ValidationError, ConflictError } = require('../utils/errors');

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
function index(req, res, next) {
  try {
    const eventId = req.params.event;
    if (!eventId) {
      throw new ValidationError('ID evento richiesto');
    }

    const allReservations = Reservation.readAll();
    const filtered = allReservations.filter(r => r.eventId === eventId);
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
    if (!eventId) {
      throw new ValidationError('ID evento richiesto');
    }

    const { id, firstName, lastName, email } = req.body;
    if (!id || !firstName || !lastName || !email) {
      throw new ValidationError('Tutti i campi id, firstName, lastName e email sono obbligatori');
    }

    const reservations = Reservation.readAll();

    if (reservations.find(r => r.id === id)) {
      throw new ConflictError('Prenotazione con questo ID esiste già');
    }

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
    next(err);
  }
}

/**
 * Elimina una prenotazione tramite id specifico associato a un evento
 * @param {Request} req 
 * @param {Response} res 
 */
function destroy(req, res, next) {
  try {
    const eventId = req.params.event;
    const reservationId = req.params.reservation;

    if (!eventId || !reservationId) {
      throw new ValidationError('ID evento e prenotazione richiesti');
    }

    const reservations = Reservation.readAll();
    const index = reservations.findIndex(r => r.id === reservationId && r.eventId === eventId);

    if (index === -1) {
      throw new NotFoundError('Prenotazione non trovata per questo evento');
    }

    reservations.splice(index, 1);
    Reservation.saveAll(reservations);

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
