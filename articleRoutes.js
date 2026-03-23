const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/articleController');

/**
 * @swagger
 * /api/articles:
 *   post:
 *     summary: Créer un article
 */
router.post('/', ctrl.createArticle);

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Obtenir tous les articles
 */
router.get('/', ctrl.getAllArticles);

/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     summary: Obtenir un article par ID
 */
router.get('/:id', ctrl.getArticleById);

/**
 * @swagger
 * /api/articles/{id}:
 *   put:
 *     summary: Modifier un article
 */
router.put('/:id', ctrl.updateArticle);

/**
 * @swagger
 * /api/articles/{id}:
 *   delete:
 *     summary: Supprimer un article
 */
router.delete('/:id', ctrl.deleteArticle);

/**
 * @swagger
 * /api/articles/search:
 *   get:
 *     summary: Rechercher un article
 */
router.get('/search', ctrl.searchArticles);

module.exports = router;