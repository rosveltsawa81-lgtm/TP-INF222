const Article = require('../models/article');

// CREATE
exports.createArticle = async (req, res) => {
    try {
        const article = await Article.create(req.body);
        res.status(201).json(article);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET ALL
exports.getAllArticles = async (req, res) => {
    const articles = await Article.findAll();
    res.json(articles);
};

// GET ONE
exports.getArticleById = async (req, res) => {
    const article = await Article.findByPk(req.params.id);
    if (!article) return res.status(404).json({ message: "Not found" });
    res.json(article);
};

// UPDATE
exports.updateArticle = async (req, res) => {
    const article = await Article.findByPk(req.params.id);
    if (!article) return res.status(404).json({ message: "Not found" });

    await article.update(req.body);
    res.json(article);
};

// DELETE
exports.deleteArticle = async (req, res) => {
    const article = await Article.findByPk(req.params.id);
    if (!article) return res.status(404).json({ message: "Not found" });

    await article.destroy();
    res.json({ message: "Deleted" });
};

// SEARCH
exports.searchArticles = async (req, res) => {
    const { query } = req.query;
    const articles = await Article.findAll({
        where: {
            contenu: query
        }
    });
    res.json(articles);
};