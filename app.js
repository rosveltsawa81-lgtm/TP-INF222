const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const articleRoutes = require('articleRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middlewares ─────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Swagger ──────────────────────────────────────────────────────────────────
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API – INF222 TAF1',
      version: '1.0.0',
      description: 'API RESTful pour gérer les articles d\'un blog simple.\n\n**Cours :** INF222 – EC1 Développement Backend',
    },
    servers: [
      { url: `http://localhost:${PORT}`, description: 'Serveur local' }
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { background-color: #2d3748; }',
  customSiteTitle: 'Blog API Docs'
}));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/articles', articleRoutes);

// Route racine
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Blog API – INF222 TAF1',
    documentation: `http://localhost:${PORT}/api-docs`,
    endpoints: {
      'POST   /api/articles':               'Créer un article',
      'GET    /api/articles':               'Lister tous les articles',
      'GET    /api/articles/search?query=': 'Rechercher des articles',
      'GET    /api/articles/:id':           'Lire un article',
      'PUT    /api/articles/:id':           'Modifier un article',
      'DELETE /api/articles/:id':           'Supprimer un article',
    }
  });
});

// Gestion des routes inexistantes
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée.' });
});

// ─── Démarrage ────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📚 Documentation Swagger : http://localhost:${PORT}/api-docs`);
});

module.exports = app;
