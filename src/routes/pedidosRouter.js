var express = require('express');
var router = express.Router();
var controler = require("../controllers/pedidoController")
const util = require("../utilidades/util")

router.get('/', util.vef, util.vefG, controler.list)
router.get('/find/:id', util.vef, controler.findById)


module.exports = router; 