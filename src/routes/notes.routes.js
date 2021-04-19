const { Router } = require("express");
const router = Router();

const {
  renderNoteForm,
  createNewNote,
  renderNotes,
  renderEditForm,
  updateNote,
  deleteNote,
} = require("../controllers/notes.controller");

const {isAuthenticated} = require('../helpers/auth'); // con esto protegemos las rutas asegurandonos de que quien las visita está autenticado


//NOTA NUEVA (formulario y creacion)
router.get("/notes/add", isAuthenticated, renderNoteForm);

router.post("/notes/new-note", isAuthenticated, createNewNote);
//post crea algo nuevo. put actuaiza algo que ya existe

//MOSTRAR Todas las notas
router.get("/notes", isAuthenticated, renderNotes);

//EDITAR NOTA
router.get("/notes/edit/:id", isAuthenticated, renderEditForm);
//la nota a editar la buscaremos especificamente por su id, que será requerida de alguna forma.
//Tambien para saber si existe o no
router.put("/notes/edit-note/:id", isAuthenticated, updateNote);
//put para actualizar la info que ya se tenia

//ELIMINAR NOTA
router.delete("/notes/delete/:id", isAuthenticated, deleteNote);

module.exports = router;
