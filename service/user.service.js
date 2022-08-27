const User = require('../model/user.model')


const getEmail = (email)=>{
    return User.findOne(email)
}

const createEntries = (entries)=>{
    return User.create(entries)
}

module.exports = {getEmail,createEntries}