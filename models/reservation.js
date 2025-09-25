// =======================
//     IMPORTAZIONI
// =======================
const fs = require('fs');
const path = require('path');

/* Alternativa ES6 Modules (per usarla, aggiungi "type": "module" in package.json):
import fs from 'fs';
import path from 'path';
*/

// =======================
//    CLASSE RESERVATION
//    METODI STATICI
// =======================
class Reservation {
    /**
     * Costruttore che crea un'istanza di Reservation con proprietà specificate
     * @param {Object} param0 Oggetto con proprietà prenotazione
     */
    constructor({ id, firstName, lastName, email, eventId }) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.eventId = eventId;
    }

    // getter e setter con validazione e messaggi in italiano

    /**
     * Imposta id prenotazione, deve essere stringa non vuota
     */
    set id(value) {
        if (!value || typeof value !== 'string') {
            throw new Error('ID prenotazione mancante o non valido');
        }
        this._id = value;
    }
    get id() {
        return this._id;
    }

    /**
     * Imposta nome, deve essere stringa non vuota
     */
    set firstName(value) {
        if (!value || typeof value !== 'string') {
            throw new Error('Nome mancante o non valido');
        }
        this._firstName = value;
    }
    get firstName() {
        return this._firstName;
    }

    /**
     * Imposta cognome, deve essere stringa non vuota
     */
    set lastName(value) {
        if (!value || typeof value !== 'string') {
            throw new Error('Cognome mancante o non valido');
        }
        this._lastName = value;
    }
    get lastName() {
        return this._lastName;
    }

    /**
     * Imposta email, valida con regex base, deve essere stringa valida
     */
    set email(value) {
        if (!value || !/^\S+@\S+\.\S+$/.test(value)) {
            throw new Error('Email mancante o non valida');
        }
        this._email = value;
    }
    get email() {
        return this._email;
    }

    /**
     * Imposta id evento associato, deve essere stringa non vuota
     */
    set eventId(value) {
        if (!value || typeof value !== 'string') {
            throw new Error('ID evento associato mancante o non valido');
        }
        this._eventId = value;
    }
    get eventId() {
        return this._eventId;
    }

    /**
     * Percorso statico al file JSON dove sono salvate le prenotazioni
     */
    static get dataFilePath() {
        return path.join(__dirname, '..', 'data', 'reservations.json');
    }

    /**
     * Metodo statico che legge tutte le prenotazioni dal file JSON
     * Restituisce un array di istanze Reservation
     */
    static readAll() {
        try {
            const data = fs.readFileSync(this.dataFilePath, 'utf-8');
            const parsed = JSON.parse(data);
            return parsed.map(reservationData => new Reservation(reservationData));
        } catch (error) {
            // In caso di errore (es. file inesistente) ritorna array vuoto
            return [];
        }
    }

    /**
     * Metodo statico che salva un array di prenotazioni su file JSON
     * @param {Array<Reservation>} reservations Array di istanze Reservation da salvare
     */
    static saveAll(reservations) {
        const dataString = JSON.stringify(reservations, null, 2);
        fs.writeFileSync(this.dataFilePath, dataString);
    }
}

// =======================
//    ESPORTAZIONI
// =======================
// CommonJS export
module.exports = Reservation;

/* ES6 export (da usare se "type": "module" in package.json):
export default Reservation;
*/
