const { Sequelize } = require('sequelize');
require('dotenv').config();

// Connexion à MariaDB avec Sequelize
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',  // Utilisation de MariaDB
        logging: false,       // Désactiver les logs SQL (mettre true pour debug)
        define: {
            timestamps: true,  // Ajoute createdAt et updatedAt automatiquement
            underscored: true  // Utilise snake_case pour les colonnes
        }
    }
);

// Fonction pour tester la connexion
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Connexion à MariaDB établie avec succès');
        
        // Synchroniser les modèles avec la base de données
        await sequelize.sync({ alter: true }); // alter: true met à jour la table sans perdre les données
        console.log('✅ Modèles synchronisés avec la base de données');
        
    } catch (error) {
        console.error('❌ Erreur de connexion:', error.message);
        process.exit(1);
    }
};

module.exports = { sequelize, testConnection };
