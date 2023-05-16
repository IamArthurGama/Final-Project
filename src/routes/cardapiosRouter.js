var express = require('express');
var router = express.Router();
var controler = require("../controllers/cardapioController")

router.get('/',controler.list)
router.post('/',controler.confirm);

router.post('/add',controler.add);
router.get('/add',controler.telaAdd);



/*router.get('/list', util.vef,controler.list);
router.get('/find/:id', util.vef, controler.findById);
router.get('/update/:id', util.vef, controler.telaEditar);
router.post('/update/:id', util.vef, controler.update);
router.get('/remove/:id', util.vef, controler.telaRemove);
router.post('/remove/:id', util.vef, controler.remove);*/

module.exports = router;