const mongoose = require('mongoose')


const schemaDef = new mongoose.Schema({
    email : {
        type:String,
        required:true
    },
    password : {
        type:String,
        required:true
    }
},{
    collection:'Practice 31 User'
})

const User = mongoose.model('User',schemaDef)

module.exports = User