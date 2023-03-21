//Configuração do servidor Express
const express = require("express")
const app = new express()

require("dotenv").config();
const ip = require("ip").address();
const protocol = process.env.PROTOCOL || "http"
const port = process.env.PORT || 3000

//Configuração do Body-Parser
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//Configuração do handlebars
const { engine } = require("express-handlebars")
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./views")

app.listen(port, () => {
    console.log(`Server start in: http://localhost:${port}`)
    console.log(`or server start in: ${protocol}://${ip}:${port}`)
})

//Configuração das rotas do servidor 
app.get("/", (req, res)=> {
    res.render("index")
})

const usuario = require("./routes/usuariosRouter")
app.use('/usuario/', usuario);

const cardapio = require("./routes/cardapiosRouter")
app.use('/cardapio/', cardapio);

//Esta rota tem que ser a última.
app.use((req, res) => {
    res.status(404).send("Página não encontrada")
});

//Configuração do banco de dados
const db = require("./models");
db.sequelize.sync().then(() => {
    console.log("Synced db.");
}).catch((err) => {
    console.log("Failed to sync db: " + err.message);
});
