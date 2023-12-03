const mongoose = require("mongoose")

const resultSchema = new mongoose.Schema({
    name:String,
    points:Number,
})

const resultModel = mongoose.model("results",resultSchema)
module.exports = resultModel