const { Schema, model } = require("mongoose");

const NoteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    //con esta propiedad lo que hacemos es incluir por defecto los datos de cuándo fue creado y cuándo actualizado por última vez
  }
);

module.exports = model('Note', NoteSchema, 'notes');
//si solo ponemos 'Note' y NoteSchema como parametros, mongodb creará el nombre de la coleccion
//utilizando el primer parametro (Note) con minuscula y en plural.
//Para evitar líos se lo podemos pasar nosotros directamente. Ese mismo o el que queramos.