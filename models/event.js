// =======================
//     IMPORTAZIONI
// =======================
const fs = require('fs');
const path = require('path');
const Reservation = require('./reservation'); // Importa il model delle prenotazioni

/* Alternativa ES6 Modules (per usarla, aggiungi "type": "module" in package.json):
import fs from 'fs';
import path from 'path';
import Reservation from './reservation';
*/


// =======================
//    CLASSE EVENT
//    METODI STATICI
// =======================
class Event {
  /**
   * Costruttore che crea un'istanza di Event con proprietà specificate
   * @param {Object} param0 - Oggetto con le proprietà evento
   */
  constructor({ id, title, description, date, maxSeats }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = date;
    this.maxSeats = maxSeats;
  }

  // getter e setter con validazione e messaggi in italiano

  /**
   * Imposta id evento; deve essere stringa non vuota
   */
  set id(value) {
    if (!value || typeof value !== 'string') {
      throw new Error('ID evento mancante o non valido');
    }
    this._id = value;
  }
  get id() {
    return this._id;
  }

  /**
   * Imposta titolo evento; deve essere stringa non vuota
   */
  set title(value) {
    if (!value || typeof value !== 'string') {
      throw new Error('Titolo evento mancante o non valido');
    }
    this._title = value;
  }
  get title() {
    return this._title;
  }

  /**
   * Imposta descrizione evento; campo opzionale ma se presente deve essere stringa
   */
  set description(value) {
    if (value !== undefined && typeof value !== 'string') {
      throw new Error('Descrizione evento non valida');
    }
    this._description = value;
  }
  get description() {
    return this._description;
  }

  /**
   * Imposta data evento; deve essere data valida ISO
   */
  set date(value) {
    if (!value || isNaN(Date.parse(value))) {
      throw new Error('Data evento mancante o non valida');
    }
    this._date = value;
  }
  get date() {
    return this._date;
  }

  /**
   * Imposta numero massimo posti; deve essere numero > 0
   */
  set maxSeats(value) {
    if (value === undefined || isNaN(value) || Number(value) < 1) {
      throw new Error('Numero massimo posti mancante o non valido');
    }
    this._maxSeats = Number(value);
  }
  get maxSeats() {
    return this._maxSeats;
  }

  /**
   * Restituisce il percorso file JSON dove sono salvati gli eventi
   */
  static get dataFilePath() {
    return path.join(__dirname, '..', 'data', 'events.json');
  }

  /**
   * Legge e restituisce tutti gli eventi salvati sul file JSON
   * @returns {Event[]} Array di istanze Event
   */
  static readAll() {
    try {
      const data = fs.readFileSync(this.dataFilePath, 'utf-8');
      const parsed = JSON.parse(data);
      return parsed.map(eventData => new Event(eventData));
    } catch (error) {
      // Ritorna array vuoto se file inesistente o errore di lettura
      return [];
    }
  }

  /**
   * Salva un array di eventi sul file JSON
   * @param {Event[]} events Array di istanze Event da salvare
   */
  static saveAll(events) {
    const dataString = JSON.stringify(events, null, 2);
    fs.writeFileSync(this.dataFilePath, dataString);
  }

  /**
   * Cerca un evento per id; restituisce l’istanza o null se non trovato
   * @param {string|number} id - id evento da cercare
   * @returns {Event|null}
   */
  static findById(id) {
    const events = this.readAll();
    return events.find(event => event.id == id) || null;
  }

  /**
   * Recupera tutti gli eventi con filtri opzionali su proprietà
   * @param {Object} filters Chiavi-valori per filtrare gli eventi
   * @returns {Event[]} Array filtrato di Event
   */
  static findAll(filters = {}) {
    let events = this.readAll();

    for (const [key, value] of Object.entries(filters)) {
      events = events.filter(event => {
        if (!event.hasOwnProperty(key)) return false;
        return String(event[key]).toLowerCase().includes(String(value).toLowerCase());
      });
    }

    return events;
  }

  /**
   * Recupera tutte le prenotazioni associate a questo evento tramite la proprietà id
   * @returns {Reservation[]} Array di prenotazioni collegate a questo evento
   */
  getReservations() {
    const allReservations = Reservation.readAll();
    return allReservations.filter(reservation => reservation.eventId == this.id);
  }
}

// =======================
//    ESPORTAZIONI
// =======================
// CommonJS export
module.exports = Event;

/* ES6 export (da usare se "type": "module" in package.json):
export default Event;
*/
