// =======================
//     IMPORTAZIONI
// =======================

const Event = require('../models/event');

// ES6 Modules
// import Event from '../models/event.js';

// =======================
//     FUNZIONI CONTROLLER
// =======================

/**
 * Restituisce la lista di tutti gli eventi, 
 * applicando eventuali filtri passati tramite query string
 * @param {Request} req 
 * @param {Response} res 
 */
function index(req, res){
    // Prendi filtri dalla query string
    const filters = req.query;

    // Recupera eventi filtrati o tutti se nessun filtro
    const events = Event.findAll(filters);

    // Rispondi con la lista eventi
    res.json(events);
}

/**
 * Restituisce un singolo evento tramite id specificato nei parametri URL
 * Se non trovato risponde con errore 404
 * @param {Request} req 
 * @param {Response} res 
 */
function show(req, res){
    const id = req.params.id;

    const event = Event.findById(id);
    if (!event) {
        return res.status(404).json({ error: 'Evento non trovato' });
    }

    res.json(event);
}

/**
 * Crea un nuovo evento.
 * Utilizza il costruttore del modello Event con validazione tramite setter.
 * Gestisce errori di validazione e conflitti id duplicati.
 * @param {Request} req 
 * @param {Response} res 
 */
function store(req, res) {
  try {
    const { id, title, description, date, maxSeats } = req.body;

    // Controllo preliminare su campi obbligatori
    if (!id || !title || !date || !maxSeats) {
      return res.status(400).json({ error: 'id, title, date, and maxSeats are required' });
    }

    // Legge tutti gli eventi esistenti
    const events = Event.readAll();

    // Controllo id duplicato
    if (events.find(event => event.id == id)) {
      return res.status(409).json({ error: 'Un evento con questo id esiste già' });
    }

    // Crea nuova istanza evento, con validazione automatica
    const newEvent = new Event({ id, title, description, date, maxSeats });

    // Aggiunge l'evento alla lista
    events.push(newEvent);

    // Salva su file JSON
    Event.saveAll(events);

    // Risponde con il nuovo evento e codice 201 Created
    res.status(201).json(newEvent);

  } catch (err) {
    // Gestione errori di validazione sollevati dai setter
    res.status(400).json({ error: err.message });
  }
}

/**
 * Aggiorna un evento esistente dato un id.
 * Aggiorna solo i campi presenti nel corpo della richiesta.
 * Gestisce errore 404 se evento non trovato, e valida campi tramite setter.
 * @param {Request} req 
 * @param {Response} res 
 */
function update(req, res) {
  const id = req.params.id;
  try {
    // Legge eventi esistenti
    const events = Event.readAll();

    // Trova indice evento da aggiornare
    const index = events.findIndex(event => event.id == id);
    if (index === -1) {
      return res.status(404).json({ error: 'Evento non trovato' });
    }

    // Aggiorna proprietà presenti nel body (setter esegue validazione)
    if (req.body.title !== undefined) events[index].title = req.body.title;
    if (req.body.description !== undefined) events[index].description = req.body.description;
    if (req.body.date !== undefined) events[index].date = req.body.date;
    if (req.body.maxSeats !== undefined) events[index].maxSeats = req.body.maxSeats;

    // Salva lista eventi aggiornata su file JSON
    Event.saveAll(events);

    // Risponde con evento aggiornato
    res.json(events[index]);

  } catch (err) {
    // Errore di validazione
    res.status(400).json({ error: err.message });
  }
}

// =======================
//     ESPORTAZIONI
// =======================
// CommonJS export
module.exports = { 
  index,
  show,
  store,
  update,
};

// ES6 Modules (da abilitare se package.json ha "type": "module")
// export default { index, store, update };
