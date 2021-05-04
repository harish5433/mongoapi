const mongoose=require("mongoose")
const company=require("./companyProfileModal")
const location=require("./locationModal")
const category=require("./categoryModal")
const jobsSchema=new mongoose.Schema(
    {
        title: {
            type:String,
            trim:true,
            required: true,
            minLength: [2, "Min 2 Character Required"],
            maxLength: [64, "max 64 Character allowed"],
        },
        short_description: {
            type:String,
            trim:true,
            required: true,
            minLength: [2, "Min 2 Character Required"],
            maxLength: [255, "max 255 Character allowed"],
        },
        long_description: {
            type:String,
            required: true,
        },
        department: {
            type:String,
            required: true,
            minLength: [2, "Min 2 Character Required"],
            maxLength: [64, "max 64 Character allowed"],
        },
        total_available_seat: {
            type:Number,
            required: true,
        },
        position: {
            type:String,
            required: true,
            minLength: [2, "Min 2 Character Required"],
            maxLength: [64, "max 64 Character allowed"],
        },
        min_salary: {
            type:Number,
            required: true,
        },
        max_salary: {
            type:Number,
            required: true,
        },
        min_exp: {
            type:Number,
            required: true,
        },
        max_exp: {
            type:Number,
            required: true,
        },
        education: {
            type:String,
            required: true,
            minLength: [2, "Min 2 Character Required"],
            maxLength: [64, "max 64 Character allowed"],
        },
        jobStatus: {
            type: Boolean,
            default: true
        },
        company: {
            type: mongoose.Schema.Types.ObjectId, ref: company,
            default: null
        },
        location: {
            type: mongoose.Schema.Types.ObjectId, ref: location,
            default: null
        },
        category: {
            type: mongoose.Schema.Types.ObjectId, ref: category,
            default: null
        }
    },
    { timestamps: true}
)

module.exports=mongoose.model("jobs", jobsSchema);