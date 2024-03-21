const express = require('express');
const Chef = require('./chef/Chef'); // Assurez-vous d'importer le modèle Chef approprié

const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        const chefs = await Chef.find();
        res.json(chefs);
    } catch (error) {
        console.error('Erreur lors de la récupération de la liste des chefs : ', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des chefs' });
    }
});

// Route pour ajouter un nouveau chef
router.post('/add', async (req, res) => {
    try {
        const { nom, specialite } = req.body;
        const nouveauChef = new Chef({ nom, specialite });
        await nouveauChef.save();
        res.status(201).json({ message: 'Chef ajouté avec succès', chef: nouveauChef });
    } catch (error) {
        console.error('Erreur lors de l\'ajout du chef : ', error);
        res.status(500).json({ message: 'Erreur lors de l\'ajout du chef' });
    }
});

router.put('/update/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const { specialite } = req.body;

        const chef = await Chef.findOneAndUpdate({ nom: name }, { specialite }, { new: true });

        if (!chef) {
            return res.status(404).json({ message: 'Chef non trouvé' });
        }

        res.json({ message: 'Chef mis à jour avec succès', chef });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du chef : ', error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du chef' });
    }
});

router.delete('/delete/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const chef = await Chef.findOneAndDelete({ nom: name });

        if (!chef) {
            return res.status(404).json({ message: 'Chef non trouvé' });
        }

        res.json({ message: 'Chef supprimé avec succès', chef });
    } catch (error) {
        console.error('Erreur lors de la suppression du chef : ', error);
        res.status(500).json({ message: 'Erreur lors de la suppression du chef' });
    }
});

module.exports = router;
