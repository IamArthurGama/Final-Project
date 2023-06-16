const db = require("../models");
const Modelo = db.Pedido;
const sequelize = db.sequelize;

const responseModel = {}
function criarResponse(){
    responseModel.success =  false
    responseModel.data =  null
    responseModel.error =  null
}
criarResponse();
 
async function findById(req, res) {
    criarResponse(); 
    const id = req.params.id;
    criarResponse();
    try{
        const data = await sequelize.query(`select nomeCardapio, preco, qtda, total, status, endereco, telefone, nomeCliente from listapedidos where idPedido = ${id}`);
        responseModel.success = true;
        responseModel.data = JSON.parse(JSON.stringify(data[0]));
        responseModel.titulo = "detalhes de Pedidos"
        
        return res.render("site/pedido/detalhe", { response: responseModel });
    }catch(error){
        responseModel.error = error;
        req.flash("error_msg", "Nenhuma informação foi encontrada.")
        res.redirect("/")
    }
}

async function list(req, res) {
    criarResponse();
    try{
        const data = await sequelize.query('select idPedido, nomeCliente from listaPedidos group by idPedido order by createdAt desc;');
        responseModel.success = true;
        responseModel.data = JSON.parse(JSON.stringify(data[0]));
        responseModel.titulo = "Lista de Pedidos"
        return res.render("site/pedido/listaPedido", { response: responseModel });
    }catch(error){
        responseModel.error = error;
        req.flash("error_msg", "Nenhuma informação foi encontrada.")
        res.redirect("/") 
    }
}













module.exports = {findById,list}