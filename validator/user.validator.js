const Joi = require('joi')


const userValidation = (fields)=>{
    const userSchema = Joi.object({
        email:Joi.string().min(8).max(32).required(),
        password:Joi.string().min(6).max(24).required()
    })

    const {error,value} = userSchema.validate(fields)
    return {error,value}
 }

 module.exports = {userValidation}