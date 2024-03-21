const mongoose = require('mongoose');

const recetteSchema = new mongoose.Schema({
  libelle: String
});

module.exports = mongoose.model('Recette', recetteSchema);
