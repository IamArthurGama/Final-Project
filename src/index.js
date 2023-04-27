//Configuração do servidor Express
const express = require("express")
const app = new express()

require("dotenv").config();
const ip = require("ip").address();
const protocol = process.env.PROTOCOL || "http"
const port = process.env.PORT || 3000

//Configuração dos arquivos publicos e estáticos
const path = require("path");
app.use(express.static(path.join(__dirname, '../public')));

//Configuração da Sessâo
const session = require("express-session")
app.use(session({
    secret:"jujubinha",
    resave:true,
    saveUninitialized:true
}))
const flash = require("connect-flash")
app.use(flash())

//Middleware
app.use((req, res, next) =>{
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    res.locals.user = req.session.user || ""
    next()
})

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
    responseModel = {}
    responseModel.success = true;
    responseModel.titulo = process.env.NOME
    req.flash("success_msg", "Foi tudo certo")
    res.render("index",{response: responseModel});  
})

const usuario = require("./routes/usuariosRouter")
app.use('/usuario/', usuario);


//Esta rota tem que ser a última.
//app.use((req, res) => {
//    res.status(404).send("Página não encontrada")
//});

//Configuração do banco de dados
const db = require("./models");
db.sequelize.sync().then(() => {
    console.log("Synced db.");
}).catch((err) => {
    console.log("Failed to sync db: " + err.message);
});
