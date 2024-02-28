// Importando bibliotecas
const express = require("express");

// Importando rotas (ele vai buscar o arquivo index.js)
const routes = require('./routes');

// Inicializando biblioteca
const app = express();

// Atribuindo o tipo de dado que será enviado pelo body e as rotas que serão utilizadas
app.use(express.json());
app.use(routes)

const PORT = 3333;
app.listen(PORT, () => {
    console.log(`O servidor local com node está rodando na porta: ${PORT}`)
});