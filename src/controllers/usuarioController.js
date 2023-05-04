const { json } = require("body-parser");
const db = require("../models");
const Modelo = db.Usuario;
const Op = db.Sequelize.Op;
const md5 = require('md5');

const responseModel = {}
function criarResponse(){
    responseModel.success =  false
    responseModel.data =  null
    responseModel.error =  null
}
criarResponse();

function vefPreenchimento(req,res){
    if(req.body.nome && req.body.email && req.body.senha){
        req.body.senha = md5(req.body.senha)
        return req.body;
    }else{
        responseModel.error = "Problema com preenchimento";
        req.flash("error_msg", "Problema com preenchimento.")
        res.redirect("/usuario/add")
    }
}

function vefPreenchimentoEditar(req, res) {

    if (req.body.ativo) {
        req.body.ativo = true
    } else {
        req.body.ativo = false
    }

    if (req.body.nome && req.body.email) {
        return req.body;
    } else {
        responseModel.error = "Problema com preenchimento";
        req.flash("error_msg", "Problema com preenchimento.")
        res.redirect("/usuario")
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
        res.render("./admin/usuario/lista",{responseModel})
        
    }).catch(error => {
        responseModel.error = error;
        return res.json(responseModel);
    });
}

function findById(req, res) {
    criarResponse();
    const id = req.params.id;
    Modelo.findByPk(id).then(data => {
        if (data) {
            responseModel.success = true;
            responseModel.data = JSON.parse(JSON.stringify(data));
            res.render("admin/usuario/detalhe", { response: responseModel })
        } else {
            responseModel.error = "Nenhuma informação foi encontrada!";
            req.flash("error_msg", "Nenhuma informação foi encontrada.")
            res.redirect("/usuario")
        }

    }).catch(error => {
        responseModel.error = error;
        req.flash("error_msg", "Nenhuma informação foi encontrada.")
        res.redirect("/usuario")
    });
}

function telaRemove(req, res) {
    criarResponse();
    const id = req.params.id;
    Modelo.findByPk(id).then(data => {
        if (data) {
            responseModel.success = true;
            responseModel.data = JSON.parse(JSON.stringify(data));
            res.render("admin/usuario/delete", { response: responseModel })
        } else {
            responseModel.error = "Nenhuma informação foi encontrada!";
            req.flash("error_msg", "Nenhuma informação foi encontrada.")
            res.redirect("/usuario")
        }

    }).catch(error => {
        responseModel.error = error;
        req.flash("error_msg", "Nenhuma informação foi encontrada.")
        res.redirect("/usuario")
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

function telaAdd(req, res) {
    criarResponse();
    responseModel.success = true;
    responseModel.titulo = "Cadastro de Usuários"
    res.render("admin/usuario/novo", { response: responseModel });
}

function add(req,res){
    criarResponse();
    modelo = vefPreenchimento(req,res);
    if(modelo){
        Modelo.create(modelo).then(data => {
            responseModel.success = true;
            responseModel.data = data;
            res.redirect("/usuario/login")
            //return res.json(responseModel);
        }).catch(error => {
            responseModel.error = error;
            return res.json(responseModel);
        });
    }
}

function telaEditar(req, res) {
    criarResponse();
    const id = req.params.id;
    Modelo.findByPk(id).then(data => {
        if (data) {
            responseModel.success = true;
            responseModel.data = JSON.parse(JSON.stringify(data));
            res.render("admin/usuario/editar", { response: responseModel })
        } else {
            responseModel.error = "Nenhuma informação foi encontrada!";
            req.flash("error_msg", "Nenhuma informação foi encontrada.")
            res.redirect("/usuario")
        }

    }).catch(error => {
        responseModel.error = error;
        req.flash("error_msg", "Nenhuma informação foi encontrada.")
        res.redirect("/usuario")
    });
}

function telaLogin(req, res) {
    criarResponse()
    responseModel.titulo = "Login de Usuários"
    res.render("admin/usuario/login", { response: responseModel })
}

function login(req, res) {
    criarResponse()
    Modelo.findAll({
        where: {
            email: req.body.email,
            senha: md5(req.body.senha),
            ativo: true
        }
    }).then(data => {
        if (data.length > 0) {
            responseModel.success = true
            responseModel.data = JSON.parse(JSON.stringify(data))
            responseModel.data.ativoAdm = responseModel.data.ativoAdm == 1?true:false
            req.session.user = responseModel.data[0]
            res.redirect("/")
        } else {
            responseModel.error = "Login ou senha incorretos!";
            req.flash("error_msg", "Login ou senha incorretos!")
            res.redirect("/usuario/login")
        }
    }).catch(error => {
        responseModel.error = error;
        req.flash("error_msg", "Login ou senha incorretos!")
        res.redirect("/usuario/login")
    })
}

function logout(req, res){
    req.session.destroy()
    res.redirect("/")
}

function telaSenha(req, res) {
    criarResponse()
    responseModel.titulo = "Mudança de senha"
    responseModel.data = req.session.user
    res.render("admin/usuario/senha", { response: responseModel })
}

function senha(req, res) {
    criarResponse()
    if(!req.body.senhaA && !req.body.senhaN && !req.body.senhaR){
        req.flash("error_msg","Alguma senha não foi preenchida!")
        res.redirect("/usuario/senha")
    }else{
        modelo = req.session.user

        const senhaA = md5(req.body.senhaA)
        const senhaN = md5(req.body.senhaN)
        const senhaR = md5(req.body.senhaR)

        if (modelo.senha != senhaA){
            req.flash("error_msg","Alguma senha não foi preenchida!")
            res.redirect("/usuario/senha")
        }else if(senhaN != senhaR){
            req.flash("error_msg","A senha não é igual a repetição!")
            res.redirect("/usuario/senha")
        }else{
            modelo.senha = senhaN
            Modelo.update(modelo,{
                where:{
                    id:modelo.id
                }
            }).then(() => {
                req.flash("success_msg","Senha alterada com sucesso!")
                res.redirect("/")
            }).catch((error) => {
                responseModel.error = error
                req.flash("error_msg","Não foi possivel alterar a senha!")
                res.redirect("/usuario/senha")
            })
        }
    }
}





module.exports = { list, findById, add, update, remove, telaAdd, telaRemove, telaEditar, telaLogin, login, logout, telaSenha, senha }