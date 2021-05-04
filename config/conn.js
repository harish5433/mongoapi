const mongoose=require("mongoose")
mongoose.connect(`mongodb://${process.env.MONGODB_PORT}/${process.env.MONGODB_NAME}`, 
{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
.then(()=> console.log("mongoose connected successfully"))
.catch((error)=> console.log(error))