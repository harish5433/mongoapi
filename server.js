var createError = require('http-errors')
const express=require("express")
const app=express();

const bodyParser=require("body-parser")
//const morgan=require("morgan")
const cors=require("cors")
require("dotenv").config()

//config mongoooes connection
const db=require('./config/conn')

const user=require("./routes/user")
const company=require("./routes/company")
const applicant=require("./routes/applicant")
const profile=require("./routes/profile")
const jobs=require("./routes/jobs")

//port 
const port=process.env.PORT || 8000

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//dev dependency
app.use(cors("dev"))
//app.use(morgan("dev"))

//add router
app.use("/", user)
app.use("/", company)
app.use("/", applicant)
app.use("/", profile)
app.use("/", jobs)

//error-handler
app.use( (req,res,next)=> {
    next(new createError(404,'Not Found'));
})
app.use((error, req,res,next)=> {
    res.status(error.status || 500).json ({
        error: {
            status: error.status || 500,
            message: error.message
        }
    })
})

// server listing on 
app.listen(port, () => {
    console.log(`server run at ${port}`)
})