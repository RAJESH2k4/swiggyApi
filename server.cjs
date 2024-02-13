const bodyParser=require("body-parser")
const express=require("express")
const mongoose=require("mongoose")

const{Restaurant,Users}=require('./schema.cjs')
const app=express()
app.use(bodyParser.json())
const connectToDb=async function(){
    try{
        await mongoose.connect('mongodb+srv://Rajesh:rajesh46@cluster0.fkrkhyv.mongodb.net/Swiggy?retryWrites=true&w=majority')
        console.log("connected to db")
        const port=process.env.PORT||8000
    app.listen(port,function(){
        console.log(`Listening on port 8000`)
    })}
    catch(error){
        console.log(error)
        console.log("failed to connect")
    }
}
connectToDb()

app.post('/add-restaurant',async function(request,response){
    try{
        await Restaurant.create({
            "name":request.body.name,
            "cuisines":request.body.cuisines,
            "costfortwo":request.body.costfortwo,
            "avgrating":request.body.avgrating,
            "areaname":request.body.areaname
        })
        response.status(200).json({
            "status" : "success"
        })
    }catch(error){
        response.status(500).json({
            "status" : "failed"
        })
    }

})
app.get('/get-restaurant-details',async function(request,response){
    try{
        const restaurantDetails=await Restaurant.find()
        response.status(200).json(restaurantDetails)
    }catch(error){
        response.status(500).json({
            "status":"failure",
            "message":"could not fetch"
        })
    }
})

app.post('/create-newuser',async function(request,response){
    try{
     await Users.create({
        "username":request.body.username,
        "password":request.body.password,
        "email":request.body.email,
        "cantact" : request.body.cantact
     })
     response.status(201).json({
        "status":"success",
        "message":"user created"
     })
    }catch(error){
        response.status(500).json({
            "status":"not received",
            "message":"internal server error"
        })
     }
    
  })

  app.post('/validate-user',async function(request,response){
    try {
        const user = await Users.findOne({
            "email" : request.body.email,
            "password" : request.body.password 
        })
        if(user) {
            response.status(200).json({
                "message" : "valid user"
            })
        } else {
            response.status(401).json({
                "message" : "invalid user"
            })
        }
    } catch(error) {
        response.status(500).json({
            "message" : "internal server error"
        })
    }
    
  })




