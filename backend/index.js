const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const resultModel = require("./models/results")


const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/quizDB")

app.get("/getResults",(req,res)=>{
  resultModel.find()
  .then(results =>res.json(results))
  .catch(err => res.json(err))
})

app.post("/save",(req,res)=>{
  const newresult = new resultModel({
    name:req.body.name,
    points:req.body.points,
  })
  newresult.save()
}) 


app.delete("/deleteResult/:id",(req,res) =>{
  
  
  resultModel.findByIdAndDelete(req.params.id)
  
})







app.listen(3001,  () =>{
  console.log("server is running")

})