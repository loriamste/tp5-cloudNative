const mongoose = require('mongoose');

const chefSchema = new mongoose.Schema({
  nom: String,
  specialite: String
});

module.exports = mongoose.model('Chef', chefSchema);
