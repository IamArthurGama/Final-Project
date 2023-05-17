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
        res.redirect("/cardapio/add")
    }
}

function confirm(req,res){
    console.log("oik")
    res.json(req.body);
}



function telaAdd(req, res) {
    criarResponse();
    responseModel.success = true;
    responseModel.titulo = "Cadastro de Cardápio"
    res.render("admin/cardapio/novo", { response: responseModel });
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
    Modelo.findAll().then(data => {
        if (data.length > 0) {
            responseModel.success = true;
            responseModel.data = JSON.parse(JSON.stringify(data));
            responseModel.titulo = "Lista de Lanches"
            console.log(responseModel)
            return res.render("admin/cardapio/lista", { response: responseModel });
        } else {
            responseModel.error = "Tabela Vazia";
            return res.json(responseModel);
        }

    }).catch(error => {
        responseModel.error = error;
        return res.json(responseModel);
    });
}

function home(req, res) {
    criarResponse();
    Modelo.findAll().then(data => {
        if (data.length > 0) {
            responseModel.success = true;
            responseModel.data = JSON.parse(JSON.stringify(data));
            console.log(responseModel)
            return res.render("./site/cardapio", { response: responseModel });
        } else {
            responseModel.error = "Tabela Vazia";
            return res.json(responseModel);
        }

    }).catch(error => {
        responseModel.error = error;
        return res.json(responseModel);
    });
}

function remove(req,res){
    criarResponse();
    const id = req.params.id;
    Modelo.findByPk(id).then(data => {
        if (data) {
            Modelo.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                responseModel.success = true;
                responseModel.data = "Lanche deletado com sucesso!";
                req.flash("success_msg", "Lanche deletado com sucesso!")
                res.redirect("/cardapio/list")
            }).catch(error => {
                responseModel.error = error;
                req.flash("error_msg", "Nenhuma informação foi encontrada.")
                res.redirect("/cardapi/list")
            });
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

function telaRemove(req, res) {
    criarResponse();
    const id = req.params.id;
    Modelo.findByPk(id).then(data => {
        if (data) {
            responseModel.success = true;
            responseModel.data = JSON.parse(JSON.stringify(data));
            res.render("admin/cardapio/delete", { response: responseModel })
        } else {
            responseModel.error = "Nenhuma informação foi encontrada!";
            req.flash("error_msg", "Nenhuma informação foi encontrada.")
            res.redirect("/cardapio/list")
        }


}





module.exports = { home, list, add, remove, telaRemove, confirm, telaAdd}