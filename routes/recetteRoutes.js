const express = require('express');
const Recette = require('./recette/Recette'); 

const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        const recettes = await Recette.find();
        res.json(recettes);
    } catch (error) {
        console.error('Erreur lors de la récupération de la liste des recettes : ', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des recettes' });
    }
});

router.post('/add', async (req, res) => {
    try {
        const { libelle } = req.body;
        const nouvelleRecette = new Recette({ libelle });
        await nouvelleRecette.save();
        res.status(201).json({ message: 'Recette ajoutée avec succès', recette: nouvelleRecette });
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la recette : ', error);
        res.status(500).json({ message: 'Erreur lors de l\'ajout de la recette' });
    }
});

router.put('/update/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const { libelle } = req.body;

        const recette = await Recette.findOneAndUpdate({ libelle: name }, { libelle }, { new: true });

        if (!recette) {
            return res.status(404).json({ message: 'Recette non trouvée' });
        }

        res.json({ message: 'Recette mise à jour avec succès', recette });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la recette : ', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la recette' });
    }
});

router.delete('/delete/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const recette = await Recette.findOneAndDelete({ libelle: name });

        if (!recette) {
            return res.status(404).json({ message: 'Recette non trouvée' });
        }

        res.json({ message: 'Recette supprimée avec succès', recette });
    } catch (error) {
        console.error('Erreur lors de la suppression de la recette : ', error);
        res.status(500).json({ message: 'Erreur lors de la suppression de la recette' });
    }
});

module.exports = router;
