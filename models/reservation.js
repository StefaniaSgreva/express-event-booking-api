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
    constructor({ id, firstName, lastName, email, eventId }) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.eventId = eventId;
    }

    static get dataFilePath() {
        return path.join(__dirname, '..', 'data', 'reservations.json');
    }

    static readAll() {
        try {
            const data = fs.readFileSync(this.dataFilePath, 'utf-8');
            const parsed = JSON.parse(data);
            return parsed.map(reservationData => new Reservation(reservationData));
        } catch (error) {
            return [];
        }
    }

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