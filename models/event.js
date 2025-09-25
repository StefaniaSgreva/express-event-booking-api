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
   * @param {Object} param0 Oggetto con proprietà evento
   */
  constructor({ id, title, description, date, maxSeats }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = date;
    this.maxSeats = maxSeats;
  }

  /**
   * Percorso statico del file JSON dove sono salvati gli eventi
   */
  static get dataFilePath() {
    return path.join(__dirname, '..', 'data', 'events.json');
  }

  /**
   * Metodo statico che legge tutti gli eventi dal file JSON
   * Restituisce un array di istanze Event
   */
  static readAll() {
    try {
      // Legge dati grezzi da file
      const data = fs.readFileSync(this.dataFilePath, 'utf-8');

      // Parsing JSON e creazione array di Event
      const parsed = JSON.parse(data);
      return parsed.map(eventData => new Event(eventData));
    } catch (error) {
      // Se errore o file non esiste, ritorna array vuoto
      return [];
    }
  }

  /**
   * Metodo statico che salva un array di eventi su file JSON
   * @param {Array<Event>} events Array di istanze Event da salvare
   */
  static saveAll(events) {
    // Serializza in JSON con indentazione
    const dataString = JSON.stringify(events, null, 2);
    // Scrive sul file JSON
    fs.writeFileSync(this.dataFilePath, dataString);
  }

  /**
   * Ritorna un singolo evento tramite id, o null se non trovato
   * @param {string|number} id 
   * @returns {Event|null}
   */
  static findById(id) {
    const events = this.readAll();
    return events.find(event => event.id == id) || null;
  }

  /**
   * Ritorna tutti gli eventi, permettendo filtri tramite oggetto query
   * @param {Object} filters chiavi-valori per filtrare (opzionale)
   * @returns {Event[]}
   */
  static findAll(filters = {}) {
    let events = this.readAll();

    // Applica filtri se presenti sulla proprietà corrispondente
    for (const [key, value] of Object.entries(filters)) {
      events = events.filter(event => {
        // Confronto stringa semplice per ora
        if (!event.hasOwnProperty(key)) return false;
        return String(event[key]).toLowerCase().includes(String(value).toLowerCase());
      });
    }

    return events;
  }

  /**
   * Recupera tutte le prenotazioni associate all'id di questo evento.
   * @returns {Reservation[]}
   */
  getReservations() {
    // Leggi tutte le prenotazioni
    const allReservations = Reservation.readAll();
    // Filtra solo quelle relative a questo evento
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
