const mongoose=require('mongoose')

const restaurantSchema = new mongoose.Schema({
    name : {
        type : String
    },
    cuisines : {
        type : Array
    },
    costfortwo : {
        type : String
    },
    avgrating : {
        type : Number
    },
    areaname : {
        type : String
    }   
})

const userSchema = new mongoose.Schema({
    username : {
        type : String
    },
    cantact : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    }
})

const Users = mongoose.model('RestaurantDetail',userSchema)

const Restaurant = mongoose.model('userDetail',restaurantSchema)

module.exports = {Restaurant,Users}