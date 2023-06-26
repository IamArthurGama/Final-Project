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
var controler = require("./controllers/cardapioController")

app.get("/", controler.listSite)

const usuario = require("./routes/usuariosRouter")
app.use('/usuario/', usuario);

const cardapio = require("./routes/cardapiosRouter")
app.use('/cardapio/', cardapio);

const pedido = require("./routes/pedidosRouter")
app.use('/pedido/', pedido);

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

app.get("/suporte",async (req,res)=>{
    try{
        //Criar View listaPedidos
        await db.sequelize.query("create view listaPedidos AS select u.nome as nomeCliente, u.endereco, u.telefone, c.nome as nomeCardapio, c.preco,p.*, (c.preco*p.qtda) as total from pedidos as p inner join usuarios as u on u.id = p.idUsuario inner join cardapios as c on c.id = p.idCardapio; ");

        //Usuários
        await db.sequelize.query("insert into usuarios(id, email, nome, telefone, endereco, senha, ativoAdm, ativo, createdAt, updatedAt) values ('1', 'a@a', 'Administrador', '11111111111', 'xxxx', '0cc175b9c0f1b6a831c399e269772661', '1', '1','2023-06-01 21:18:58','2023-06-01 21:18:58');");
        await db.sequelize.query("insert into usuarios(id, email, nome, telefone, endereco, senha, ativoAdm, ativo, createdAt, updatedAt) values ('2', 'fun@a', 'Funcionário', '11111111111', 'xxxx', '0cc175b9c0f1b6a831c399e269772661', '2', '1','2023-06-01 21:18:58','2023-06-01 21:18:58');");
        await db.sequelize.query("insert into usuarios(id, email, nome, telefone, endereco, senha, ativoAdm, ativo, createdAt, updatedAt) values ('3', 'cliente@a', 'Cliente', '11111111111', 'xxxx', '0cc175b9c0f1b6a831c399e269772661', '0', '1','2023-06-01 21:18:58','2023-06-01 21:18:58');");
        //Lanches
        await db.sequelize.query("insert into cardapios(id, nome, descricao, foto, fotoDestaque, preco, ativo, createdAt, updatedAt) values ('1', 'X-Tudo', 'Pão, carne, queijo, bacon, salada, ovo.', '/images/1.jpg', '/images/1.jpg', '29.99', '1','2023-06-01 21:18:58','2023-06-01 21:18:58');");
        await db.sequelize.query("insert into cardapios(id, nome, descricao, foto, fotoDestaque, preco, ativo, createdAt, updatedAt) values ('2', 'X-Salada', 'Pão, carne, queijo, bacon, salada.', '/images/2.jpg', '/images/2.jpg', '24.99', '1','2023-06-01 21:18:58','2023-06-01 21:18:58');");
        await db.sequelize.query("insert into cardapios(id, nome, descricao, foto, fotoDestaque, preco, ativo, createdAt, updatedAt) values ('3', 'X-Bacon', 'Pão, carne, queijo, bacon.', '/images/3.jpg', '/images/3.jpg', '21.99', '1','2023-06-01 21:18:58','2023-06-01 21:18:58');");
        await db.sequelize.query("insert into cardapios(id, nome, descricao, foto, fotoDestaque, preco, ativo, createdAt, updatedAt) values ('4', 'X-Egg', 'Pão, carne, queijo e ovo.', '/images/4.jpg', '/images/4.jpg', '21.99', '1','2023-06-01 21:18:58','2023-06-01 21:18:58');");
        await db.sequelize.query("insert into cardapios(id, nome, descricao, foto, fotoDestaque, preco, ativo, createdAt, updatedAt) values ('5', 'Simples', 'Pão, carne, queijo e salada.', '/images/5.jpg', '/images/5.jpg', '19.99', '1','2023-06-01 21:18:58','2023-06-01 21:18:58');");
        
        req.flash("success_msg", "Dados iniciais adicionados com sucesso!")
        res.redirect("/")
    }catch(error){
        req.flash("error_msg", "Alguns dados já foram inseridos!")
        res.redirect("/")
    }
})
