import express from 'express';
import controller from './router';
import bodyParser from "body-parser"

const server = express();
const PORT: number = 3000
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

server.use('/api/v1', controller);
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

server.listen(PORT, () => {
  console.log(`Server is running at https://localhost:${PORT}`);
});