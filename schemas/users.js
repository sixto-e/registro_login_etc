const joi = require('@hapi/joi');
const schemas ={
    auth: joi.object().keys({
        username : joi.string().min(4).max(10).required(),
        password: joi.string().min(4).max(10).required() 
    })
};

module.exports = {schemas}