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

function phoneMask(v) {

    let r = v.replace(/\D/g, "");
    r = r.replace(/^0/, "");
  
    if (r.length > 11) {
      r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (r.length > 7) {
      r = r.replace(/^(\d\d)(\d{5})(\d{0,4}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
      r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else if (v.trim() !== "") {
      r = r.replace(/^(\d*)/, "($1");
    }
    return r;
  }
 
async function findById(req, res) {
    criarResponse(); 
    const id = req.params.id;
    criarResponse();
    try{
        const data = await sequelize.query(`select nomeCardapio, preco, qtda, total, status, endereco, telefone, nomeCliente, idPedido, createdAt from listapedidos where idPedido = ${id}`);
        responseModel.success = true;
        responseModel.data = JSON.parse(JSON.stringify(data[0]));
        cliente = {}
        cliente.nome = responseModel.data[0].nomeCliente
        cliente.endereco = responseModel.data[0].endereco
        cliente.telefone = phoneMask(responseModel.data[0].telefone)
        
        cliente.idPedido = responseModel.data[0].idPedido
        cliente.total = responseModel.data[0].total.toFixed(2).replace(".",",")
        cliente.preco = responseModel.data[0].preco.toFixed(2).replace(".",",")
        cliente.createdAt = responseModel.data[0].createdAt
        

        responseModel.cliente = cliente
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