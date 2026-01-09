const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UsersData = mongoose.Schema({
    username :{
        type: String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    Password :{
        type : String,
        required : true
    }
})

module.exports = mongoose.model('usersdata',UsersData)