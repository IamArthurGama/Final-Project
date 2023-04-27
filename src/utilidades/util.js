function vef(req, res, next){
    if(!req.session.user){
        res.redirect("/usuario/login")
    }else{
        next();
    }
}

module.exports = { vef }