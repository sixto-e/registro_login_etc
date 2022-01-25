const pool = require('./../utils/BD');
const TABLA_USUARIOS = "usuarios";
const TABLA_IMAGENES = "imagenes_user";

const create = async(obj)=>{
    try{
        const query = "INSERT INTO ?? SET ?";
        const params = [TABLA_USUARIOS, obj];
        return await pool.query(query, params);
    }catch(e){
        console.log(e)
    }
}


const getUsername = async(user)=>{
    try{
        const query = "SELECT id, username, password FROM ?? WHERE username = ?";
        const params = [TABLA_USUARIOS, user];
        return await pool.query(query, params);
    }catch(e){
        console.log(e)
    }
}


const auth = async({username, password})=>{
    try{
        const query = "SELECT id, username FROM ?? WHERE username = ? AND password = ?";
        const params = [TABLA_USUARIOS,username, password];
        return await pool.query(query, params);
    }catch(e){
        console.log(e);
    }
}


const single = async(ida)=>{
    try{
        const query = "SELECT id, username, password  FROM ?? WHERE id = ?";
        const params = [TABLA_USUARIOS, ida];
        return await pool.query(query, params);

    }catch(e){
        console.log(e)
    }
}


const posteo = async(obj)=>{
    try{
        const query = "INSERT INTO ?? SET ?";
        const params = [TABLA_IMAGENES, obj];
        return await pool.query(query, params);

    }catch(e){
        console.log(e)
    }
}


module.exports = {create, getUsername, auth, single, posteo};