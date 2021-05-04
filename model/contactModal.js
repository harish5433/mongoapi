const mongoose=require("mongoose")
const applicants=require("./applicantProfileModal")
const contactSchema=new mongoose.Schema(
    {
        applicantId: {
            type: mongoose.Schema.Types.ObjectId, ref: applicants,
        },
        phone: {
        type:String,
        trim:true,
        required: true,
        minLength: [5, "Min 5 Character Required"],
        maxLength: [15, "max 15 Character allowed"],
        },
        type: {
            type:String,
            default: "primary"
        },
    },
    { timestamps: true}
)
module.exports=mongoose.model("contacts", contactSchema);