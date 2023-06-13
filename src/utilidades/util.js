function vef(req, res, next){
    if(!req.session.user){
        res.redirect("/usuario/login")
    }else{
        next();
    }
}

function vefN(req, res, next){
    if(req.session.user.ativoAdm==1){
        next();
    }else{
        res.redirect("/cardapio")
    }
}



module.exports = { vef, vefN }