const ArticleModel = require('articleModel');

const ArticleController = {

  // POST /api/articles
  create(req, res) {
    const { titre, contenu, auteur, date, categorie, tags } = req.body;

    // Validation des champs obligatoires
    if (!titre || titre.trim() === '') {
      return res.status(400).json({ error: 'Le titre est obligatoire.' });
    }
    if (!contenu || contenu.trim() === '') {
      return res.status(400).json({ error: 'Le contenu est obligatoire.' });
    }
    if (!auteur || auteur.trim() === '') {
      return res.status(400).json({ error: "L'auteur est obligatoire." });
    }

    try {
      const article = ArticleModel.create({ titre, contenu, auteur, date, categorie, tags });
      return res.status(201).json({
        message: 'Article créé avec succès.',
        article
      });
    } catch (err) {
      return res.status(500).json({ error: 'Erreur serveur.', details: err.message });
    }
  },

  // GET /api/articles
  getAll(req, res) {
    const { categorie, auteur, date } = req.query;
    try {
      const articles = ArticleModel.findAll({ categorie, auteur, date });
      return res.status(200).json({ articles });
    } catch (err) {
      return res.status(500).json({ error: 'Erreur serveur.', details: err.message });
    }
  },

  // GET /api/articles/search
  search(req, res) {
    const { query } = req.query;
    if (!query || query.trim() === '') {
      return res.status(400).json({ error: 'Le paramètre query est requis.' });
    }
    try {
      const articles = ArticleModel.search(query);
      return res.status(200).json({ articles });
    } catch (err) {
      return res.status(500).json({ error: 'Erreur serveur.', details: err.message });
    }
  },

  // GET /api/articles/:id
  getOne(req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID invalide.' });
    }
    try {
      const article = ArticleModel.findById(id);
      if (!article) {
        return res.status(404).json({ error: 'Article non trouvé.' });
      }
      return res.status(200).json({ article });
    } catch (err) {
      return res.status(500).json({ error: 'Erreur serveur.', details: err.message });
    }
  },

  // PUT /api/articles/:id
  update(req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID invalide.' });
    }
    try {
      const article = ArticleModel.update(id, req.body);
      if (!article) {
        return res.status(404).json({ error: 'Article non trouvé.' });
      }
      return res.status(200).json({
        message: 'Article mis à jour avec succès.',
        article
      });
    } catch (err) {
      return res.status(500).json({ error: 'Erreur serveur.', details: err.message });
    }
  },

  // DELETE /api/articles/:id
  delete(req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID invalide.' });
    }
    try {
      const deleted = ArticleModel.delete(id);
      if (!deleted) {
        return res.status(404).json({ error: 'Article non trouvé.' });
      }
      return res.status(200).json({ message: `Article ${id} supprimé avec succès.` });
    } catch (err) {
      return res.status(500).json({ error: 'Erreur serveur.', details: err.message });
    }
  }
};

module.exports = ArticleController;
