var express = require('express');
const {diskStorage} = require("multer")
var router = express.Router();
const multer = require("multer")
const mimeTypes = require("mime-types");
const {v4 : uuid} = require('uuid');
const {single, posteo} = require('./../models/usuarios')
const fs = require('fs');
const path = require('path');


const storage = diskStorage({
    destination :"uploads/",
    filename: function(req,file,cb){
        cb("", uuid() + "." + mimeTypes.extension(file.mimetype))
    }
})

const upload = multer({
    storage, 
    limits : {fileSize : 100000000},
    fileFilter : function(req,file,cb){
        if(file.mimetype == "image/jpg"|| file.mimetype == "image/jpeg" || file.mimetype == "image/gif"){
            cb(null, true)
        }else{
            cb(null, false);
            return cb(new Error('Only jpg, jpeg, gif'))
        }
    }
})
/*      {{#each usuario}}
        <input  class="form-control" type="number" name="id_user" value="{{id}}" max="{{id}}" min="{{id}}" >
        {{/each}}
        </label>
      */



const get =async (req, res)=>{
    const usuario = await single(req.session.user);
    res.render("post", {usuario});
}

const publicar =async(req,res)=>{
    console.log(req.file)
   const obj = req.file.filename; 
   const newpost = await posteo(obj)
   console.log(newpost);
 
    res.send("imagen subida")

} 


router.get("/", get);
router.post("/", upload.single("imagen"), publicar)

module.exports = router;