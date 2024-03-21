// Import des dépendances
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Utilisateur = require('./auth-service/utilisateur'); // Assurez-vous d'importer le modèle Utilisateur approprié

const router = express.Router();

router.post('/register', async (req, res) => {
    const { nom, email, login, mdp } = req.body;

    try {
        
        const utilisateurExist = await Utilisateur.findOne({ login });
        if (utilisateurExist) {
            return res.status(400).json({ message: 'L\'utilisateur existe déjà' });
        }

        const hashedPassword = await bcrypt.hash(mdp, 10);

        const nouvelUtilisateur = new Utilisateur({
            nom,
            email,
            login,
            mdp: hashedPassword
        });
        await nouvelUtilisateur.save();

        res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
    } catch (error) {
        console.error("Erreur lors de l'inscription de l'utilisateur : " +error);
        res.status(500).json({ message: "Erreur lors de l'inscription de l\'utilisateur" });
    }
});

router.post('/login', async (req, res) => {
    const { login, mdp } = req.body;

    try {
        
        const utilisateur = await Utilisateur.findOne({ login });
        if (!utilisateur) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        const motDePasseValide = await bcrypt.compare(mdp, utilisateur.mdp);
        if (!motDePasseValide) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        const token = jwt.sign({ utilisateurId: utilisateur._id }, 'votre_secret');

        res.json({ token });
    } catch (error) {
        console.error("Erreur lors de la connexion de l'utilisateur : ", error);
        res.status(500).json({ message: 'Erreur lors de la connexion de l\'utilisateur' });
    }
});

module.exports = router;
