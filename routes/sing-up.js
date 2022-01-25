const express = require('express');
var router = express.Router();
const sha1 = require("sha1");
const {verifySingUP} = require('./../middlewares/users')
const {create, getUsername, auth} = require('../models/usuarios');

const newUser = async(req, res)=>{
    const user = req.body.username;
    console.log("usuario:", user);
    const resultado = await getUsername(user);
    console.log("result:", resultado);
    if(resultado.length === 0){
        req.body.password = sha1("req.body.password");
        const obj = req.body;
        const addUser = await create(obj);
        console.log(addUser)
        var result = await auth(obj);
        const [{id, username}] = result;
            
        req.session.user = id;
        req.session.name = username;
        console.log("req.session.name en sing-up: ",req.session.name )
    
        res.redirect('/Perfil');
    }else{
        res.render('sing-up', {message : "username no disponible"})
    }
   
}
const addingUser = async(req, res)=>{
    res.render('sing-up');
}

router.get('/', addingUser);
router.post('/create', verifySingUP,newUser);

module.exports = router;
            //COMENTARIOS:
//anda bien, lo que tengo que hacer es que el registro no le aparezca a las personas registradas...
//es decir, que una vez logueado no haya forma de ir a la ruta /sing-up