const company=require("../model/companyProfileModal")
const users=require("./../model/userModal")
const mongoose=require("mongoose")
var createError = require('http-errors')

exports.company=async(req,res,next)=>{
    try{
        let profile=await company.aggregate([
            {
              $lookup: {
                 from: "users", // collection name in db
                 localField: "userId",
                 foreignField: "_id",
                 as: "user"
              }
            }
         ])
        if(profile.length<1){
            throw createError(404,'record not found')
        }
            res.status(200).json({count: profile.length, data: profile})
    }
    catch(err){
        next(err)
    }
}

exports.getProfileBySalt=async(req,res,next)=>{
    try{
        let profile=await company.aggregate([
            {
              $lookup: {
                 from: "users", // collection name in db
                 localField: "userId",
                 foreignField: "_id",
                 as: "user"
              }
            },
            {
                $match: {
                    userName: req.params.salt
                }
            }
         ])
        if(profile.length<1){
            throw createError(404,'record not found')
        }
            res.status(200).json({data: profile})
    }
    catch(err){
        next(err)
    }
}