function vef(req, res, next){
    if(!req.session.user){
        res.redirect("/usuario/login")
    }else{
        next();
    }
}

function vefN(req, res, next){
    if(req.session.user.adm==1){
        next();
    }else{
        req.flash("error_msg", "Acesso negado")
        res.redirect("/")
    }
}

function vefG(req, res, next){
    if(!req.session.user.ativoAdm==0){
        next();
    }else{
        req.flash("error_msg", "Acesso negado")
        res.redirect("/")
    }
}



module.exports = { vef, vefN, vefG }