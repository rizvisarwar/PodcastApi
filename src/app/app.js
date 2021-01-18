"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const body_parser_1 = __importDefault(require("body-parser"));
const server = express_1.default();
const PORT = 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
server.use('/api/v1', router_1.default);
server.use(body_parser_1.default.json());
server.use(body_parser_1.default.urlencoded({ extended: true }));
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.listen(PORT, () => {
    console.log(`Server is running at https://localhost:${PORT}`);
});
