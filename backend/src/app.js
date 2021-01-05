// Configura a aplicação

const express = require('express');
const rotas = require("./routes");
require("./database");

// Iniciando a aplicação
const app = express();

// Nas requisições, podem ter corpos no formato JSON.
app.use(express.json());

// Cadastrando as rotas
app.use(rotas);

module.exports = app;