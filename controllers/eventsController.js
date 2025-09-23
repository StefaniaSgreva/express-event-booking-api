// =======================
//    IMPORTAZIONI
// =======================

// =======================
//    FUNZIONI
// =======================
// Controller che restituisce la lista di tutti gli eventi
function index(req, res){
    res.status(501).send('Funzione index non implementata');
}

// Controller che crea un nuovo evento
function store(req, res){
    res.status(501).send('Funzione store non implementata');
}

// Controller che aggiuorna un evento specifico (event)
function update(req, res){
    res.status(501).send('Funzione update non implementata');
}

// =======================
//    ESPORTAZIONI
// =======================
// CommonJS
module.exports = { 
  index,
  store,
  update,
};

// ES6 Modules
// export default { index, store, update };