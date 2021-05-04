const mongoose=require("mongoose")
const applicants=require("./applicantProfileModal")
const addressSchema=new mongoose.Schema(
    {
        applicantId: {
            type: mongoose.Schema.Types.ObjectId, ref: applicants,
        },
        addrssLine1: {
        type:String,
        trim:true,
        required: true,
        minLength: [2, "Min 2 Character Required"],
        maxLength: [32, "max 32 Character allowed"],
        },
        addrssLine2: {
            type:String,
            trim:true,
            required: true,
            minLength: [2, "Min 2 Character Required"],
            maxLength: [32, "max 32 Character allowed"],
        },
        zipCode: {
            type:Number,
            trim:true,
            required: true,
            minLength: [5, "Min 5 Character Required"],
            maxLength: [15, "max 15 Character allowed"],
        },
        city: {
            type:String,
            trim:true,
            required: true,
            minLength: [2, "Min 2 Character Required"],
            maxLength: [32, "max 32 Character allowed"],
        },
        state: {
            type:String,
            trim:true,
            required: true,
            minLength: [2, "Min 2 Character Required"],
            maxLength: [32, "max 32 Character allowed"],
        },
        country: {
            type:String,
            trim:true,
            required: true,
            minLength: [2, "Min 2 Character Required"],
            maxLength: [32, "max 32 Character allowed"],
        },
    },
    { timestamps: true}
)
module.exports=mongoose.model("addresses", addressSchema);