function vef(req, res, next){
    if(!req.session.user){
        res.redirect("/usuario/login")
    }else{
        next();
    }
}

function vefAdm(req, res, next){
    if(!req.session.userAdm){
        res.redirect("/usuario/login")
    }else{
        next();
    }
}

module.exports = { vef }