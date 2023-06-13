var express = require('express');
var router = express.Router();
var controler = require("../controllers/cardapioController")
const util = require("../utilidades/util")

router.get('/list', util.vef, controler.list)
/*router.post('/confirma',controler.confirm);*/
router.get('/',controler.home)
router.post('/', controler.confirm)

router.get('/final', (req,res)=>{
    if(req.session.user){
        res.redirect("/cardapio/finalizar")
    }else{
        req.session.destino="finalizar"
        res.redirect("/usuario/login")
    }
})

router.get('/finalizar', controler.final)

router.get('/add',util.vef,util.vefN,controler.telaAdd);
router.post('/add',util.vef,util.vefN,controler.add);

router.get('/find/:id', util.vef, controler.findById);

router.get('/update/:id', util.vef,util.vefN, controler.telaEditar);
router.post('/update/:id', util.vef,util.vefN, controler.update);

router.get('/remove/:id', util.vef,util.vefN, controler.telaRemove);
router.post('/remove/:id', util.vef,util.vefN, controler.remove);

router.get('/:id',controler.deleta)


module.exports = router;