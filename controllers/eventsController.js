// =======================
//    IMPORTAZIONI
// =======================

const Event = require('../models/event');

// =======================
//    FUNZIONI
// =======================
// Controller che restituisce la lista di tutti gli eventi
function index(req, res){
    // Prendi filtri dalla query string
    const filters = req.query;

    // Recupera eventi filtrati o tutti se nessun filtro
    const events = Event.findAll(filters);

    res.json(events);
}

// Controller che visualizza il singolo evento
function show(req, res){
    const id = req.params.id;

    const event = Event.findById(id);
    if (!event) {
        return res.status(404).json({ error: 'Evento non trovato' });
    }

    res.json(event);
}

// Controller che crea un nuovo evento
function store(req, res){
    // Prendi i dati dal body della richiesta
    const { id, title, description, date, maxSeats } = req.body;

    // Validazione base 
    if (!id || !title || !date || !maxSeats) {
        return res.status(400).json({ error: 'id, title, date, and maxSeats are required' });
    }

    // Leggi tutti gli eventi esistenti
    const events = Event.readAll();

    // Verifica che l'id non sia già presente
    const exists = events.find(event => event.id == id);
    if (exists) {
        return res.status(409).json({ error: 'Un evento con questo id esiste già' });
    }

    // Crea nuova istanza evento
    const newEvent = new Event({ id, title, description, date, maxSeats });

    // Aggiungi nuovo evento alla lista
    events.push(newEvent);

    // Salva su file
    Event.saveAll(events);

    res.status(201).json(newEvent);
}

// Controller che aggiuorna un evento specifico (event)
function update(req, res){
    const id = req.params.id;
    const { title, description, date, maxSeats } = req.body;

    // Leggi tutti gli eventi
    const events = Event.readAll();

    // Trova evento da aggiornare
    const index = events.findIndex(event => event.id == id);
    if (index === -1) {
        return res.status(404).json({ error: 'Evento non trovato' });
    }

    // Aggiorna proprietà se presenti nel body
    if (title !== undefined) events[index].title = title;
    if (description !== undefined) events[index].description = description;
    if (date !== undefined) events[index].date = date;
    if (maxSeats !== undefined) events[index].maxSeats = maxSeats;

    // Salva su file
    Event.saveAll(events);

    res.json(events[index]);
}

// =======================
//    ESPORTAZIONI
// =======================
// CommonJS
module.exports = { 
  index,
  show,
  store,
  update,
};

// ES6 Modules
// export default { index, store, update };