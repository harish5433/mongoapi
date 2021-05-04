const jobs=require("../model/jobModal")
const mongoose=require("mongoose")
var createError = require('http-errors')

exports.addjob=async(req,res,next)=>{
    try{
        const job=new jobs({
            title: req.body.title,
            short_description: req.body.short_description,
            long_description: req.body.long_description,
            department: req.body.department,
            total_available_seat: req.body.total_available_seat,
            position: req.body.position,
            min_salary: req.body.min_salary,
            max_salary: req.body.max_salary,
            min_exp: req.body.min_exp,
            max_exp: req.body.max_exp,
            education: req.body.education,
            company: req.body.company,
            location: req.body.location,
            category: req.body.category,
        })
        let newJob=await job.save();
        res.status(201).json({
            message: "Created successfully",
            data: newJob
        })
    }
    catch(err){
        if(err.name == `ValidationError`){
            next(createError(422, err.message));
            return;
        }
        next(err)
    }
}

exports.getAllJobs=async(req,res,next)=>{
    try{
        let job=await jobs.find({});
        if(job.length<1){
            throw createError(404,'record not found')
        }
            res.status(200).json({count: job.length, data: job})
    }
    catch(err){
        next(err)
    }
}

exports.getAllJobs=async(req,res,next)=>{
    try{
        let job=await jobs.find({});
        if(job.length<1){
            throw createError(404,'record not found')
        }
            res.status(200).json({count: job.length, data: job})
    }
    catch(err){
        next(err)
    }
}
exports.getCompanyJob=async(req,res,next)=>{
    try{
        let job=await jobs.find({company: "6067f6d64b192d266cd1c57b"});
        if(job.length<1){
            throw createError(404,'record not found')
        }
            res.status(200).json({count: job.length, data: job})
    }
    catch(err){
        next(err)
    }
}