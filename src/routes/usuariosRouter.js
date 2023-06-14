var express = require('express');
var router = express.Router();
var controler = require("../controllers/usuarioController")
const util = require("../utilidades/util")

router.get('/', util.vef, controler.list);


router.get('/perfil', util.vef, controler.findUser
)



router.get('/add', controler.telaAdd);
router.post('/add', controler.add);

router.get('/list', util.vef,controler.list);
router.get('/find/:id', util.vef, controler.findById);
router.get('/update/:id', util.vef, controler.telaEditar);
router.post('/update/:id', util.vef, controler.update);
router.get('/remove/:id', util.vef, util.vefN, controler.telaRemove);
router.post('/remove/:id', util.vef, util.vefN, controler.remove);

router.get("/login",controler.telaLogin)
router.post("/login",controler.login)
router.get("/logout",controler.logout)

router.get("/senha", util.vef, controler.telaSenha)
router.post("/senha", util.vef, controler.senha)


router.get('/erro', (req,res)=>{
    res.render("site/error")
})

module.exports = router;