const bcrypt = require('bcrypt');
const users=require("./../model/userModal")
const applicant=require("../model/applicantProfileModal")
const company=require("../model/companyProfileModal")
const jwt=require("jsonwebtoken");
const smptTransporter=require("./../config/smptConfig")
const mongoose=require("mongoose")
var createError = require('http-errors')

exports.applicantRegister=async(req,res,next)=>{
    try{
        const user=new users({
            email: req.body.email,
            password:req.body.password,
            userName:req.body.email.split("@")[0],
            userType: 3
        })
        let email=await users.find({email: req.body.email});
        if(email.length>0){
            res.status(422).json("email already exist")
        } else{
            let newUser=await user.save();
            if(newUser){
                const profile=new applicant({
                    userId: newUser._id,
                    userName:newUser.userName,
                    fname: req.body.fname,
                    lname:req.body.lname,
                })
               let data=await profile.save();
               var token=await jwt.sign({user:newUser}, process.env.JWT_SECRET, {expiresIn: '24h'});
                const userdata=await users.findByIdAndUpdate(
                    { _id: newUser._id}, 
                    {resetToken: token} , {new: true}
                )
                if(userdata){
                    const mailOptions={
                        from: process.env.SMTP_USER,
                        to: user.email,
                        subject: "verify user mail link",
                        html: 
                        `<h2>You have register successfully</h2>
                        <p>click on link to verify</p>`
                    }
                    smptTransporter.sendMail(mailOptions, function(err,info){
                        res.status(201).json({
                            message: "User Created successfully",
                            data: userdata
                        })         
                    })
                }
            }
        }
    }
    catch(err){
        if(err.name == `ValidationError`){
            next(createError(422, err.message));
            return;
        }
        next(err)
    }
}

exports.comapnyRegister=async(req,res,next)=>{
    try{
        const user=new users({
            email: req.body.email,
            password:req.body.password,
            userName:req.body.email.split("@")[0],
            userType: 2
        })
        let email=await users.find({email: req.body.email});
        if(email.length>0){
            res.status(422).json("email already exist")
        } else{
            let newUser=await user.save();
            if(newUser){
                const profile=new company({
                    userId: newUser._id,
                    userName:newUser.userName,
                    fname: req.body.fname,
                    lname: req.body.lname,
                    company:req.body.company,
                    RegisterationNo:req.body.RegisterationNo,
                    phone:req.body.phone,
                    zip:req.body.zip,
                    addressLine1:req.body.addressLine1,
                    addressLine2:req.body.addressLine2,
                    city:req.body.city,
                    state:req.body.state,
                })
                let data=await profile.save();
                var token=await jwt.sign({user:newUser}, process.env.JWT_SECRET, {expiresIn: '24h'});
                 const userdata=await users.findByIdAndUpdate(
                     { _id: newUser._id}, 
                     {resetToken: token}, {new: true}
                 )
                 if(userdata){
                     const mailOptions={
                         from: process.env.SMTP_USER,
                         to: user.email,
                         subject: "verify user mail link",
                         html: 
                         `<h2>You have register successfully</h2>
                         <p>click on link to verify</p>`
                     }
                     smptTransporter.sendMail(mailOptions, function(err,info){
                         res.status(201).json({
                             message: "User Created successfully",
                             data: userdata
                         })         
                     })
                 }
            }
        }
    }
    catch(err){
        if(err.name == `ValidationError`){
            next(createError(422, err.message));
            return;
        }
        next(err)
    }
}

exports.verify=async(req,res,next)=>{
    try{
        const token=req.params.token
            jwt.verify(token, process.env.JWT_SECRET,async function(err, match) {
                if(match){
                    var user= await users.findOne({resetToken: token})
                    if(!user){
                        next(createError(404,'user with this token not match.'));
                    }
                    else{
                            var result=await users.updateOne({resetToken:token},{resetToken: null, isActive: true},{new:true})
                            if(result){
                                const mailOptions={
                                    from: process.env.SMTP_USER,
                                    to: result.email,
                                    subject: "verified",
                                    html: 
                                    `<h2>you are now verified user</h2>
                                    <p>pls login</p>`
                                }
                                smptTransporter.sendMail(mailOptions, function(err,info){
                                    res.status(200).json("verified successfully now login")         
                                }) 
                            }
                    }
                } else if(err) {
                     next(createError(401,'token expire or not match.'));
                }
            });
    }
    catch(err){
         next(err)
    }
}

exports.login=async(req,res,next)=>{
    try{
        const{email, password}=req.body
        var result= await users.findOne({email:email})
        if(result){
           const isMatch=await bcrypt.compare(password, result.password)
           if(isMatch){
              if(result.isActive){
                const userdata=await users.findByIdAndUpdate(
                    { _id: result._id}, 
                    {lastLogin: new Date()}, {new: true} 
                )
                if(userdata){
                    var token=await jwt.sign({user:result}, process.env.JWT_SECRET);
                        res.status(200).json({
                            message: "User Found",
                            user: userdata,
                            token: token
                        })
                }
              } else {
                res.status(401).json("user not verified")
              }
           } else {
                res.status(403).json("email or password is wrong")
           }
        } else{
            res.status(403).json("email or password is wrong")
        }
    }
    catch(err){
        next(err)
    }
}

exports.forgetPassword=async(req,res,next)=>{
    try{
        const{email}=req.body
        var user= await users.findOne({email})
        if(user){
            var token=await jwt.sign({user:user._id}, process.env.JWT_SECRET, {expiresIn: "8h"})
            var result= await users.updateOne({email:email},{ resetToken: token })
            if(result){
                const mailOptions={
                    from: process.env.SMTP_USER,
                    to: user.email,
                    subject: "password reset link",
                    html: 
                    `<h2>click on this to reset password</h2>
                    <p>${req.headers.host}/reset-password/${token}</p>`
                }
                smptTransporter.sendMail(mailOptions, function(err,info){ 
                    res.status(200).json({
                        message: "password reset link send to your email",
                        link: `${req.headers.host}/users/reset-password/${token}`
                    })             
                })
            }

        } else{
            res.status(403).json("user with this email does not exist")
        }
    }
    catch(err){
        next(err)
    }
}

exports.resetPassword=async(req,res,next)=>{
    try{
        const password=req.body.password
        const token=req.params.token
            jwt.verify(token, process.env.JWT_SECRET,async function(err, match) {
                if(match){
                    var user= await users.findOne({resetToken: token})
                    if(!user){
                        next(createError(404,'user with this token not match.'));
                    }
                    else{
                        bcrypt.hash(password, 10, async function(err, hash) {
                            if(err){
                                next(createError(422, "password required"));
                            }
                            var result=await users.updateOne({resetToken:token},{password: hash,
                                resetToken: null})
                            if(result){
                                const mailOptions={
                                    from: process.env.SMTP_USER,
                                    to: user.email,
                                    subject: "password reset success",
                                    html: 
                                    `<h2>Password reset success</h2>
                                    <p>now login</p>`
                                }
                                smptTransporter.sendMail(mailOptions, function(err,info){
                                    res.status(201).json("password reset successfully")         
                                 }) 
                            }
                        });
                    }
                } else if(err) {
                     next(createError(401,'token expire or not match.'));
                }
            });
    }
    catch(err){
         next(err)
    }
}

exports.getAllUser=async(req,res,next)=>{
    try{
        let user=await users.find();
        if(user.length<1){
            throw createError(404,'record not found')
        }
            res.status(200).json({count: user.length, data: user})
    }
    catch(err){
        next(err)
    }
}
exports.getUserByID=async(req,res,next)=>{
   try{
    const _id=req.params.id
    let user=await users.find({_id});
        if(user.length<1){
            throw createError(404,'Record not found.');
        }
        res.status(200).json(user)
    }
    catch(err){
        if(err instanceof mongoose.CastError){
            return next(createError(400,'Invalid user Id.'));
        }
        next(err)
    }
}
exports.updateUser=async(req,res,next)=>{
    try{
        const _id=req.params.id
        let updateUser=await users.findByIdAndUpdate({_id}, 
                req.body,
                {new:true}
            );
            res.status(201).json({
                message: "updated successfully",
                data:updateUser
            })

    }
    catch(err){
        if(err instanceof mongoose.CastError){
            return next(createError(400,'Invalid user Id.'));
        }
        next(err)
    }
}
exports.deleteUser=async(req,res,next)=>{
    try{
        const _id=req.params.id
        let user=await users.findByIdAndDelete({_id});
            if(user){
                res.status(200).json({
                    message: "deleted successfully",
                    data:user
                })
            }
            throw createError(404,'user does not exist');
    }
    catch(err){
        if(err instanceof mongoose.CastError){
            return next(createError(400,'Invalid user Id.'));
        }
        next(err)
    }
}


