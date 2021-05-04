const mongoose=require("mongoose")
const categorySchema=new mongoose.Schema(
    {
        category: {
        type:String,
        trim:true,
        required: true,
        minLength: [2, "Min 2 Character Required"],
        maxLength: [64, "max 64 Character allowed"],
        },
    },
    { timestamps: true}
)
module.exports=mongoose.model("categories", categorySchema);