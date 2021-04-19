'use strict';

const notesCtrl = {};


const Note = require('../models/notes');


notesCtrl.renderNoteForm = (req,res) => {
    res.render('notes/new-note');
};

notesCtrl.createNewNote = async (req,res) => {
    const {title, description} = req.body;
//este title y description vienen del formulario, los "name" de label e input
    const newNote = new Note ({title:title, description:description});
//estos title y description son los que definimos en el modelo y que les damos el valor de los anteriores
    console.log(newNote); //para comprobar que se crea
    await newNote.save();
    req.flash('success_msg', 'Note created successfully'); //requerimos directamente la funcionalidad del modulo que instalamos para los mensajes entre vistas
    //El primer parametro es el nombre que le damos al mensaje, el segundo es el mensaje en si
    res.redirect('/notes');
};

notesCtrl.renderNotes = async (req, res) => {
    const notes = await Note.find();
    res.render('notes/all-notes', {notes});
};

notesCtrl.renderEditForm = async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.render('notes/edit-note', {note: note});
};

notesCtrl.updateNote = async (req, res) => {
    // const {title, description} = req.body;  Esta forma sería igual que como lo hacemos en createNweNote. luego seria poner title:title, description:description.
    await Note.findByIdAndUpdate(req.params.id, {title:req.body.title, description:req.body.description}); //lo pongo mas detallado para saber de donde viene.
    req.flash('success_msg', 'Note updated successfully');
    res.redirect('/notes');
};

notesCtrl.deleteNote = async (req, res) => {
    console.log(req.params);
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Note Deleted successfully');
    res.redirect('/notes');
};


module.exports = notesCtrl;