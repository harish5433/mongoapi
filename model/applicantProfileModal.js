const mongoose=require("mongoose")
const users=require("./userModal")
const applicantProfileSchema=new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId, ref: users,
        },
        fname: {
            type:String,
            trim:true,
            required: true,
            minLength: [2, "Min 2 Character Required"],
            maxLength: [32, "max 32 Character allowed"],
        },
        lname: {
            type:String,
            trim:true,
            required: true,
            minLength: [2, "Min 2 Character Required"],
            maxLength: [32, "max 32 Character allowed"],
        },
        userName: {
            type:String,
        },
        bio: {
            type:String,
        },
        resume: {
            type:String,
        },
        instagram: {
            type:String,
            default:null,
        },
        facebook: {
            type:String,
            default:null,
        },
        profileStatus: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true}
)

module.exports=mongoose.model("applicant", applicantProfileSchema);