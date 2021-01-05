// Este arquivo tem como responsabilidade, cadastrar as rotas da aplicação. 

const express = require("express");
const {route} = require("./app")

// Criando o routerizador
const routes = express.Router();

const alunoController = require("./controllers/aluno");
const postagem = require("./controllers/postagem");

// Rotas de usuário
routes.get("/alunos", alunoController.listar);
routes.get("/alunos/:id", alunoController.buscarPorId);
routes.post("/alunos", alunoController.store);

// Rotas de postagens
routes.post("/postagens", postagemController.store);
routes.post("/postagens/:id", postagemController.delete);

module.exports = routes;

