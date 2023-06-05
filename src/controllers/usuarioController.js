const { json } = require("body-parser");
const db = require("../models");
const Modelo = db.Usuario;
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

function list(req, res) {
    criarResponse();
    Modelo.findAll().then(data => {
        if (data.length > 0) {
            responseModel.success = true;
            responseModel.data = JSON.parse(JSON.stringify(data));
            responseModel.titulo = "Lista de Usuários"
            console.log(responseModel)
            return res.render("site/usuario/lista", { response: responseModel });
        } else {
            responseModel.error = "Tabela Vazia";
            req.flash("error_msg", "Nenhuma informação foi encontrada.")
            res.redirect("/")
        }

    }).catch(error => {
        responseModel.error = error;
        req.flash("error_msg", "Nenhuma informação foi encontrada.")
        res.redirect("/")
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

function findUser(req, res) {
    criarResponse();
    const id = req.session.user.id;
    Modelo.findByPk(id).then(data => {
        if (data) {
            responseModel.success = true;
            responseModel.data = JSON.parse(JSON.stringify(data));
            res.render("site/usuario/perfil", { response: responseModel })
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
    modelo = vefPreenchimentoEditar(req,res);
    if(modelo){
        const id = req.params.id;
        Modelo.findByPk(id).then(data => {
            if (data) {
                Modelo.update(modelo, {
                    where: {
                        id: id
                    }
                }).then(() => {
                    req.flash("success_msg", "Usuário editado com sucesso!")
                    if (req.session.user.ativoAdm != 1){
                    res.redirect("/usuario/perfil")
                    }else{
                        res.redirect("/usuario")
                    }
                }).catch(error => {
                    responseModel.error = error;
                    req.flash("error_msg", "Nenhuma informação foi encontrada!")
                    res.redirect("/usuario")
                });
            } else {
                responseModel.error = "Nenhuma informação foi encontrada!";
                req.flash("error_msg", "Nenhuma informação foi encontrada!")
                res.redirect("/usuario")
            }
            
        }).catch(error => {
            responseModel.error = error;
            req.flash("error_msg", "Erro na edição")
            res.redirect("/usuario")
        });
    }
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
                responseModel.data = "Usuário deletado com sucesso!";
                req.flash("success_msg", "Usuario deletado com sucesso!")
                res.redirect("/usuario")
            }).catch(error => {
                responseModel.error = error;
                req.flash("error_msg", "Nenhuma informação foi encontrada.")
                res.redirect("/usuario")
            });
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

function telaAdd(req, res) {
    criarResponse();
    responseModel.success = true;
    responseModel.titulo = "Cadastro de Usuários"
    res.render("site/usuario/novo", { response: responseModel });
}

function add(req,res){ 
    criarResponse();
    modelo = vefPreenchimento(req,res);
    if(modelo){
        Modelo.create(modelo).then(data => {
            responseModel.success = true;
            responseModel.data = data;
            req.flash("success_msg", "Usuário cadastrado com sucesso!")
            res.redirect("/usuario/login")
            //return res.json(responseModel);
        }).catch(error => {
            responseModel.error = error;
            req.flash("error_msg", "Ocorreu um erro durante o cadastro.")
            res.redirect("/usuario/add")
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
    res.render("site/usuario/login", { response: responseModel })
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

            if(responseModel.data[0].ativoAdm>0){
                responseModel.data[0].adm = responseModel.data[0].ativoAdm == 1?true:false
                responseModel.data[0].ativoAdm = true;
            }else{
                responseModel.data[0].ativoAdm = false;
            }
            
            
            req.session.user = responseModel.data[0]
            if(req.session.destino == "finalizar"){
                res.redirect("/cardapio/finalizar")
            }else{
                res.redirect("/")
            }
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
    res.render("site/usuario/senha", { response: responseModel })
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





module.exports = { list, findById, add, update, remove, telaAdd, telaRemove, telaEditar, telaLogin, login, logout, telaSenha, senha, findUser }