const express = require('express');
const Restaurant = require('./restaurant/Restaurant');
const Chef = require('./chef/Chef');
const Recette = require('./recette/Recette');

const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.json(restaurants);
    } catch (error) {
        console.error('Erreur lors de la récupération de la liste des restaurants : ', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des restaurants' });
    }
});

router.get('/chefs/:restaurantname', async (req, res) => {
    try {
        const { restaurantname } = req.params;
        const restaurant = await Restaurant.findOne({ nom: restaurantname }).populate('chefs');
        
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant non trouvé' });
        }

        res.json(restaurant.chefs);
    } catch (error) {
        console.error('Erreur lors de la récupération des chefs du restaurant : ', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des chefs du restaurant' });
    }
});

router.get('/recettes/:restaurantname', async (req, res) => {
    try {
        const { restaurantname } = req.params;
        const restaurant = await Restaurant.findOne({ nom: restaurantname }).populate('recettes');
        
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant non trouvé' });
        }

        res.json(restaurant.recettes);
    } catch (error) {
        console.error('Erreur lors de la récupération des recettes du restaurant : ', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des recettes du restaurant' });
    }
});

router.post('/add', async (req, res) => {
    try {
        const { nom } = req.body;
        const nouveauRestaurant = new Restaurant({ nom });
        await nouveauRestaurant.save();
        res.status(201).json({ message: 'Restaurant ajouté avec succès', restaurant: nouveauRestaurant });
    } catch (error) {
        console.error('Erreur lors de l\'ajout du restaurant : ', error);
        res.status(500).json({ message: 'Erreur lors de l\'ajout du restaurant' });
    }
});

router.put('/update/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const { nom } = req.body;

        const restaurant = await Restaurant.findOneAndUpdate({ nom: name }, { nom }, { new: true });

        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant non trouvé' });
        }

        res.json({ message: 'Restaurant mis à jour avec succès', restaurant });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du restaurant : ', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du restaurant' });
    }
});

router.delete('/delete/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const restaurant = await Restaurant.findOneAndDelete({ nom: name });

        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant non trouvé' });
        }

        res.json({ message: 'Restaurant supprimé avec succès', restaurant });
    } catch (error) {
        console.error('Erreur lors de la suppression du restaurant : ', error);
        res.status(500).json({ message: 'Erreur lors de la suppression du restaurant' });
    }
});

module.exports = router;
