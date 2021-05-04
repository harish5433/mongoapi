const mongoose=require("mongoose")
const applicants=require("./applicantProfileModal")
const skillSchema=new mongoose.Schema(
    {
        applicantId: {
            type: mongoose.Schema.Types.ObjectId, ref: applicants,
        },
        skill: {
        type:String,
        trim:true,
        uppercase: true,
        required: true,
        minLength: [2, "Min 2 Character Required"],
        maxLength: [32, "max 32 Character allowed"],
        },
    },
    { timestamps: true}
)
module.exports=mongoose.model("skills", skillSchema);