const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  chef_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chef'
  },
  recette_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recette'
  },
  nom: String
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
