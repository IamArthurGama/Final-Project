const { json } = require("body-parser");
const db = require("../models");
const Modelo = db.Cardapio;
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

function vefPreenchimento(req,res){
    if(req.body.nome){
        return req.body;
    }else{
        responseModel.error = "Problema com preenchimento";
        req.flash("error_msg", "Problema com preenchimento.")
        res.redirect("/cadastro/add")
    }
}


function list(req, res) {
    criarResponse();
    Modelo.findAll().then(data => {
        if (data.length > 0) {
            responseModel.success = true;
            responseModel.data = JSON.parse(JSON.stringify(data));
            res.render('./site/cardapio', { response: responseModel })
        } else {
            responseModel.error = "Tabela Vazia";
            return res.json(responseModel);
        }

    }).catch(error => {
        responseModel.error = error;
        return res.json(responseModel);
    });
}

function confirm(req,res){
    console.log("oik")
    res.json(req.body);
}

function add(req,res){
    criarResponse();
    modelo = vefPreenchimento(req,res);
    if(modelo){
        Modelo.create(modelo).then(data => {
            responseModel.success = true;
            responseModel.data = data;
            res.json(responseModel)
            res.redirect("/cardapio")
        }).catch(error => {
            responseModel.error = error;
            res.json(responseModel)
        });
    }
}


function telaAdd(req, res) {
    criarResponse();
    responseModel.success = true;
    responseModel.titulo = "Cadastro de Cardápio"
    res.render("admin/cardapio/novo", { response: responseModel });
}







module.exports = { list, add, confirm, telaAdd}