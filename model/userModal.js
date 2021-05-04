const mongoose=require("mongoose")
const validator = require("validator")
const bcrypt = require('bcrypt');

const usersSchema=new mongoose.Schema(
    {
        email: {
            type:String,
            trim:true,
            lowercase: true,
            required: true,
            unique:true,
            minLength: [6, "Min 6 Character Required"],
            maxLength: [64, "max 64 Character allowed"],
            validate(value) {
                if(!validator.isEmail(value)){
                    throw new Error("email is not valid")
                }
            }
        },
        password: {
            type:String,
            trim:true,
            required: true,
            minLength: [6, "Min 6 Character Required"],
            maxLength: [15, "max 15 Character allowed"],
        },
        userName: {
            type:String,
        },
        avatar: {
            type: String,
            default:null
        },
        resetToken: {
            type:String,
            default:null
        },
        userType: {
            type: Number,
        },
        lastLogin: {
            type:Date,
            default:null
        },
        isActive: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true}
)
usersSchema.pre('save', async function(err, next) {
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password, 10);
    }
})

module.exports=mongoose.model("users", usersSchema);