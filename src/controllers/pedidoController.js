const { json } = require("body-parser");
const db = require("../models");
const Modelo = db.Pedido;
const Op = db.Sequelize.Op;
const md5 = require('md5');
const { response } = require("express");


const responseModel = {}
function criarResponse(){
    responseModel.success =  false
    responseModel.data =  null
    responseModel.error =  null
}
criarResponse();
 
function findById(req, res) {
    criarResponse();
    const id = req.params.id;
    Modelo.findByPk(id).then(data => {
        if (data) {
            responseModel.success = true;
            responseModel.data = JSON.parse(JSON.stringify(data));
            res.render("site/pedido/detalhe", { response: responseModel })
        } else {
            responseModel.error = "Nenhuma informação foi encontrada!";
            req.flash("error_msg", "Nenhuma informação foi encontrada.")
            res.redirect("/cardapio/list")
        }

    }).catch(error => {
        responseModel.error = error;
        req.flash("error_msg", "Nenhuma informação foi encontrada.")
        res.redirect("/cardapio/list")
    });
}

function list(req, res) {
    criarResponse();
    Modelo.findAll().then(data => {
        if (data.length > 0) {
            responseModel.success = true;
            responseModel.data = JSON.parse(JSON.stringify(data));
            responseModel.titulo = "Lista de Pedidos"
            return res.render("site/pedido/listaPedido", { response: responseModel });
        } else {
            return res.render("site/pedido/listaPedido", { response: responseModel });
            responseModel.error = "Tabela Vazia";
            return res.json(responseModel);
        }

    }).catch(error => {
        responseModel.error = error;
        return res.json(responseModel);
    });
}













module.exports = {findById,list}