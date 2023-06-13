var express = require('express');
var router = express.Router();
var controler = require("../controllers/pedidoController")
const util = require("../utilidades/util")

router.get('/', util.vef, util.vefG, controler.list)
router.get('/detalhe', (req,res)=>{
    res.render("site/pedido/detalhe")
})


module.exports = router; 