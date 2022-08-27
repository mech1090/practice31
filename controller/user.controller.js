const userService = require('../service/user.service')
const bcrypt = require('bcrypt')
const config = require('config')
const {userValidation} = require('../validator/user.validator')


const getLoginForm= (req,res)=>{
    return res.render('login/layout')
}

const login = async(req,res)=>{

    const {email,password} = req.body
    const fields = {email,password}
    const {error,value} = userValidation(fields)
    if(error){
        return res.render('login/layout',{message:error.details[0].message})
    }
    const findUser = await userService.getEmail({email})
    if(!findUser){
        return res.render('signup/layout',{message:'User does not exists Signup'})
    }
    const matchPassword = await bcrypt.compare(password,findUser.password)
    if(!matchPassword){
        return res.render('login/layout',{message:'Credential Wrong'})
    }


    return res.render('user/layout')
}

const getSignupForm = (req,res) => {
    return res.render('signup/layout')
}

const signup = async(req,res)=>{
    const {email,password} = req.body
    const fields = {email,password}
    const {error,value} = userValidation(fields)
    if(error){
        return res.render('signup/layout',{message:error.details[0].message})
    }
    const findUser = await userService.getEmail({email})
    if(findUser){
        return res.render('login/layout',{message:'User Exists login here'})
    }
    const hashPassword = await bcrypt.hash(password,config.get('hash.salt'))
    const createFields = await userService.createEntries({email,password:hashPassword})


    return res.render('signup/layout',{message:'User Created'})

}

module.exports = {getLoginForm,login,getSignupForm,signup}