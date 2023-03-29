const { json } = require("body-parser");
const db = require("../models");
const Modelo = db.Cardapio;
const Op = db.Sequelize.Op;

const responseModel = {}
function criarResponse(){
    responseModel.success =  false
    responseModel.data =  null
    responseModel.error =  null
}
criarResponse();

function vefPreenchimento(req,res){
    if(req.body.nome && req.body.descricao && req.body.preco){
        return req.body;
    }else{
        responseModel.error = "Problema com preenchimento";
        res.json(responseModel);
    }
}

function list(req,res){
    criarResponse();
    Modelo.findAll().then(data => {
        if(data.length>0){
            responseModel.success = true;
            responseModel.data = JSON.parse(JSON.stringify(data));
        }else{
            responseModel.error = "Tabela Vazia";
        }
        res.render("./admin/usuario/cardapio",{responseModel})
        
    }).catch(error => {
        responseModel.error = error;
        return res.json(responseModel);
    });
}

function findById(req,res){
    criarResponse();
    const id = req.params.id;
    Modelo.findByPk(id).then(data => {
        if(data){
            responseModel.success = true;
            responseModel.data = data;
            return res.json(responseModel);
        }else{
            responseModel.error = "Nenhuma informação foi encontada!";
            return res.json(responseModel);
        }
        
    }).catch(error => {
        responseModel.error = error;
        return res.json(responseModel);
    });
}

function update(req,res){
    criarResponse();
    modelo = vefPreenchimento(req,res);
    if(modelo){
        const id = req.params.id;
        Modelo.findByPk(id).then(data => {
            if(data){
                Modelo.update(modelo,{
                    where: {
                        id: id
                    }
                }).then(() => {
                    return findById(req,res);
                }).catch(error => {
                    responseModel.error = error;
                    return res.json(responseModel);
                });
            }else{
                responseModel.error = "Nenhuma informação foi encontada!";
                return res.json(responseModel);
            }
            
        }).catch(error => {
            responseModel.error = error;
            return res.json(responseModel);
        });
    }
}

function remove(req,res){
    criarResponse();
    const id = req.params.id;
    Modelo.findByPk(id).then(data => {
        if(data){
            Modelo.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                responseModel.success = true;
                responseModel.data = "Usuário deletado com sucesso!";
                return res.json(responseModel);
            }).catch(error => {
                responseModel.error = error;
                return res.json(responseModel);
            });
        }else{
            responseModel.error = "Nenhuma informação foi encontada!";
            return res.json(responseModel);
        }
        
    }).catch(error => {
        responseModel.error = error;
        return res.json(responseModel);
    });    
}

function add(req,res){
    criarResponse();
    modelo = vefPreenchimento(req,res);
    if(modelo){
        Modelo.create(modelo).then(data => {
            responseModel.success = true;
            responseModel.data = data;
            res.redirect("/cardapio/list")
            //return res.json(responseModel);
        }).catch(error => {
            responseModel.error = error;
            return res.json(responseModel);
        });
    }
}



module.exports = { list, findById, add, update, remove}