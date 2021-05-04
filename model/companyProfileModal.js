const mongoose=require("mongoose")
const users=require("./userModal")
const companyProfileSchema=new mongoose.Schema(
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
        company: {
            type:String,
            required: true,
            minLength: [4, "Min 4 Character Required"],
            maxLength: [32, "max 32 Character allowed"],
        },
        RegisterationNo: {
            type:String,
            required: true,
            minLength: [5, "Min 5 Character Required"],
            maxLength: [32, "max 32 Character allowed"],
        },
        phone: {
            type:String,
            required: true,
            minLength: [5, "Min 5 Character Required"],
            maxLength: [15, "max 15 Character allowed"],
        },
        zip: {
            type:Number,
            required: true,
            minLength: [4, "Min 4 Character Required"],
            maxLength: [15, "max 15 Character allowed"],
        },
        addressLine1: {
            type:String,
            required: true,
            minLength: [2, "Min 2 Character Required"],
            maxLength: [32, "max 32 Character allowed"],
        },
        addressLine2: {
            type:String,
            required: true,
            minLength: [2, "Min 2 Character Required"],
            maxLength: [32, "max 32 Character allowed"],
        },
        city: {
            type:String,
            required: true,
            minLength: [2, "Min 2 Character Required"],
            maxLength: [32, "max 32 Character allowed"],
        },
        state: {
            type:String,
            required: true,
            minLength: [2, "Min 2 Character Required"],
            maxLength: [32, "max 32 Character allowed"],
        },
        userName: {
            type:String,
        },
    },
    { timestamps: true}
)

module.exports=mongoose.model("companies", companyProfileSchema);