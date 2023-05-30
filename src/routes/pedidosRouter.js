var express = require('express');
var router = express.Router();
var controler = require("../controllers/pedidoController")
const util = require("../utilidades/util")

router.get('/', util.vef, controler.list)


module.exports = router; 