var express = require('express');
var router = express.Router();
var controler = require("../controllers/cardapioController")

router.get("/add", (req, res) => {
    res.render("./admin/usuario/addCardapio")
})

router.post('/add', controler.add);
router.get('/list',controler.list);
router.get('/find/:id', controler.findById);
router.put('/update/:id', controler.update);
router.delete('/remove/:id', controler.remove);
  
module.exports = router;