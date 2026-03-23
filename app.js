const express = require('express');
const app = express();

const sequelize = require('./config/database');
const articleRoutes = require('./routes/articleRoutes');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

app.use(express.json());

app.use('/api/articles', articleRoutes);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// DB sync
sequelize.sync()
    .then(() => {
        console.log("Database connected");
        app.listen(3000, () => {
            console.log("Server running on http://localhost:3000");
        });
    })
    .catch(err => console.log(err));