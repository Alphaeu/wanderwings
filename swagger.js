const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const dotenv = require('dotenv');

dotenv.config();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'WanderWings API Documentation',
            version: '1.0.0',
            description: 'This is the API documentation for the WanderWings airline travel portal backend.',
            contact: {
                name: 'Support',
                email: 'support@wanderwings.com'
            },
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}`,
                description: 'Local server',
            },
            {
                url: 'https://wanderwings.herokuapp.com',
                description: 'Production server',
            },
        ],
    },
    apis: ['./routes/*.js', './models/*.js'], // files containing annotations as above
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Optionally: Serve JSON format
    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
};

module.exports = swaggerDocs;
