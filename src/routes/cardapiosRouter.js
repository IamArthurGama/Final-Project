var express = require('express');
var router = express.Router();
var controler = require("../controllers/cardapioController")

router.get('/list',controler.list)
router.post('/',controler.confirm);
router.get('/',controler.home)

router.get('/add',controler.telaAdd);
router.post('/add',controler.add);



/*router.get('/list', util.vef,controler.list);
router.get('/find/:id', util.vef, controler.findById);
router.get('/update/:id', util.vef, controler.telaEditar);
router.post('/update/:id', util.vef, controler.update);
*/
router.get('/remove/:id', controler.telaRemove);
router.post('/remove/:id', controler.remove);

module.exports = router;