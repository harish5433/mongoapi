const applicant=require("../model/applicantProfileModal")
const mongoose=require("mongoose")
var createError = require('http-errors')

exports.applicant=async(req,res,next)=>{
    try{
        let profile=await applicant.aggregate([
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
        let profile=await applicant.aggregate([
            {
                $match: {
                    userName:req.params.salt
                }
              },
            {
              $lookup: {
                 from: "users", // collection name in db
                 localField: "userId",
                 foreignField: "_id",
                 as: "user"
              }
            },
            { "$unwind": "$user" },
            {
                $lookup: {
                    from: "contacts",
                    localField: "_id",
                    foreignField: "applicantId",
                    as: "contact"
                }
            },
            {
                $lookup: {
                    from: "skills",
                    localField: "_id",
                    foreignField: "applicantId",
                    as: "skill"
                }
            },
            {
                $lookup: {
                    from: "addresses",
                    localField: "_id",
                    foreignField: "applicantId",
                    as: "address"
                }
            },
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