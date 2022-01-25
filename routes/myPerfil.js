var express = require('express');
var router = express.Router();
const {single} = require('./../models/usuarios');
const getUser = async(req, res) => {
    /*console.log("req.session.name en perfil: ", req.session.name);
    const usuario = await single(req.session.name);
    console.log(usuario)*/
    const usuario = await single(req.session.user);
    console.log(usuario);
    res.render('perfil', {usuario});
}
router.get('/', getUser)

module.exports = router;