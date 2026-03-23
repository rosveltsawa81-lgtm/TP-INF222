# Blog API – INF222 TAF1

API RESTful pour gérer les articles d'un blog simple.  
**Stack :** Node.js · Express · SQLite · Swagger UI

---

## Installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/VOTRE_USERNAME/blog-api.git
cd blog-api

# 2. Installer les dépendances
npm install

# 3. Démarrer le serveur
npm start         # production
npm run dev       # développement (avec rechargement automatique)
```

Le serveur démarre sur **http://localhost:3000**  
La documentation Swagger est accessible sur **http://localhost:3000/api-docs**

---

## Endpoints

| Méthode | Endpoint                        | Description                        |
|---------|---------------------------------|------------------------------------|
| POST    | `/api/articles`                 | Créer un article                   |
| GET     | `/api/articles`                 | Lister tous les articles           |
| GET     | `/api/articles?categorie=Tech`  | Filtrer par catégorie              |
| GET     | `/api/articles?auteur=Charles`  | Filtrer par auteur                 |
| GET     | `/api/articles?date=2026-03-18` | Filtrer par date                   |
| GET     | `/api/articles/:id`             | Lire un article spécifique         |
| PUT     | `/api/articles/:id`             | Modifier un article                |
| DELETE  | `/api/articles/:id`             | Supprimer un article               |
| GET     | `/api/articles/search?query=js` | Rechercher dans titre et contenu   |

---

## Exemples d'utilisation

### Créer un article
```bash
curl -X POST http://localhost:3000/api/articles \
  -H "Content-Type: application/json" \
  -d '{
    "titre": "Introduction au Web",
    "contenu": "Le développement web consiste à...",
    "auteur": "Charles",
    "categorie": "Technologie",
    "tags": ["web", "html", "css"]
  }'
```
Réponse `201` :
```json
{
  "message": "Article créé avec succès.",
  "article": {
    "id": 1,
    "titre": "Introduction au Web",
    "auteur": "Charles",
    "date": "2026-03-18",
    "categorie": "Technologie",
    "tags": ["web", "html", "css"]
  }
}
```

### Lister tous les articles
```bash
curl http://localhost:3000/api/articles
```

### Lire un article
```bash
curl http://localhost:3000/api/articles/1
```

### Modifier un article
```bash
curl -X PUT http://localhost:3000/api/articles/1 \
  -H "Content-Type: application/json" \
  -d '{ "titre": "Nouveau titre", "categorie": "Développement" }'
```

### Supprimer un article
```bash
curl -X DELETE http://localhost:3000/api/articles/1
```

### Rechercher
```bash
curl "http://localhost:3000/api/articles/search?query=web"
```

---

## Structure du projet

```
blog-api/
├── src/
│   ├── app.js                  # Point d'entrée, configuration Express & Swagger
│   ├── config/
│   │   └── database.js         # Connexion et initialisation SQLite
│   ├── models/
│   │   └── articleModel.js     # Requêtes SQL (CRUD)
│   ├── controllers/
│   │   └── articleController.js # Logique métier + validation
│   └── routes/
│       └── articleRoutes.js    # Définition des routes + annotations Swagger
├── blog.db                     # Base de données SQLite (générée automatiquement)
├── package.json
└── README.md
```

---

## Codes HTTP utilisés

| Code | Signification                        |
|------|--------------------------------------|
| 200  | OK – Requête réussie                 |
| 201  | Created – Ressource créée            |
| 400  | Bad Request – Données invalides      |
| 404  | Not Found – Article inexistant       |
| 500  | Internal Server Error – Erreur serveur |
