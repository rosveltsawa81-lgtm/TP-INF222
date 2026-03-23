const db = require('database');

const ArticleModel = {

  // Créer un article
  create(data) {
    const { titre, contenu, auteur, date, categorie, tags } = data;
    const tagsJson = JSON.stringify(tags || []);
    const dateValue = date || new Date().toISOString().split('T')[0];

    const stmt = db.prepare(`
      INSERT INTO articles (titre, contenu, auteur, date, categorie, tags)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(titre, contenu, auteur, dateValue, categorie || 'Général', tagsJson);
    return ArticleModel.findById(result.lastInsertRowid);
  },

  // Trouver tous les articles (avec filtres optionnels)
  findAll({ categorie, auteur, date } = {}) {
    let query = 'SELECT * FROM articles WHERE 1=1';
    const params = [];

    if (categorie) { query += ' AND categorie = ?'; params.push(categorie); }
    if (auteur)    { query += ' AND auteur = ?';    params.push(auteur); }
    if (date)      { query += ' AND date = ?';      params.push(date); }

    query += ' ORDER BY id DESC';

    const rows = db.prepare(query).all(...params);
    return rows.map(parseTags);
  },

  // Trouver un article par ID
  findById(id) {
    const row = db.prepare('SELECT * FROM articles WHERE id = ?').get(id);
    return row ? parseTags(row) : null;
  },

  // Mettre à jour un article
  update(id, data) {
    const article = ArticleModel.findById(id);
    if (!article) return null;

    const titre     = data.titre     ?? article.titre;
    const contenu   = data.contenu   ?? article.contenu;
    const categorie = data.categorie ?? article.categorie;
    const tags      = data.tags      ?? article.tags;

    db.prepare(`
      UPDATE articles SET titre = ?, contenu = ?, categorie = ?, tags = ? WHERE id = ?
    `).run(titre, contenu, categorie, JSON.stringify(tags), id);

    return ArticleModel.findById(id);
  },

  // Supprimer un article
  delete(id) {
    const result = db.prepare('DELETE FROM articles WHERE id = ?').run(id);
    return result.changes > 0;
  },

  // Rechercher dans titre ou contenu
  search(query) {
    const like = `%${query}%`;
    const rows = db.prepare(`
      SELECT * FROM articles
      WHERE titre LIKE ? OR contenu LIKE ?
      ORDER BY id DESC
    `).all(like, like);
    return rows.map(parseTags);
  }
};

// Helper : convertir les tags JSON en tableau
function parseTags(row) {
  try {
    row.tags = JSON.parse(row.tags);
  } catch {
    row.tags = [];
  }
  return row;
}

module.exports = ArticleModel;
