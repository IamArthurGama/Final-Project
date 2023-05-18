var express = require('express');
var router = express.Router();
var controler = require("../controllers/cardapioController")
const util = require("../utilidades/util")

router.get('/list', util.vef, controler.list)
/*router.post('/confirma',controler.confirm);*/
router.get('/confirma', (req,res)=> {
    res.render("admin/cardapio/confirma")
});
router.get('/',controler.home)

router.get('/add',controler.telaAdd);
router.post('/add',controler.add);

router.get('/find/:id', util.vef, controler.findById);

router.get('/update/:id', util.vef, controler.telaEditar);
router.post('/update/:id', util.vef, controler.update);

router.get('/remove/:id', util.vef, controler.telaRemove);
router.post('/remove/:id', util.vef, controler.remove);

module.exports = router;