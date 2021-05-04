const skills=require("./../model/skillModal")
const contacts=require("./../model/contactModal")
const address=require("./../model/addressModal")
const locations=require("./../model/locationModal")
const category=require("./../model/categoryModal")
const mongoose=require("mongoose")
var createError = require('http-errors')

exports.addskill=async(req,res,next)=>{
    try{
        const skill=new skills({
            applicantId: req.body.applicantId,
            skill: req.body.skill,
        })
        let newSkill=await skill.save();
        res.status(201).json({
            message: "Created successfully",
            data: newSkill
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
exports.updateSkill=async(req,res,next)=>{
    try{
        const _id=req.params.id
        const newskill=await skills.findByIdAndUpdate({_id}, 
            req.body,
            {new:true}
        );
            if(newskill){
                res.status(201).json({
                    message: "updated successfully",
                    data:newskill
                })
            }
            throw createError(404,'record not found.');

    }
    catch(err){
        if(err instanceof mongoose.CastError){
            return next(createError(400,'Invalid Id.'));
        }
        next(err)
    }
}
exports.deleteSkill=async(req,res,next)=>{
    try{
        const _id=req.params.id
        let skill=await skills.findByIdAndDelete({_id});
            if(skill){
                res.status(200).json({
                    message: "deleted successfully",
                    data:skill
                })
            }
            throw createError(404,'Record not found');
    }
    catch(err){
        if(err instanceof mongoose.CastError){
            return next(createError(400,'Invalid Id.'));
        }
        next(err)
    }
}

exports.getAllSkills=async(req,res,next)=>{
    try{
        let skill=await skills.find({});
        if(skill.length<1){
            throw createError(404,'record not found')
        }
            res.status(200).json({count: skill.length, data: skill})
    }
    catch(err){
        next(err)
    }
}

exports.addContact=async(req,res,next)=>{
    try{
        const contact=new contacts({
            applicantId: req.body.applicantId,
            phone: req.body.phone,
        })
        let newContact=await contact.save();
        res.status(201).json({
            message: "Created successfully",
            data: newContact
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
exports.updateContact=async(req,res,next)=>{
    try{
        const _id=req.params.id
        const newContacts=await contacts.findByIdAndUpdate({_id}, 
            req.body,
            {new:true}
        );
            if(newContacts){
                res.status(201).json({
                    message: "updated successfully",
                    data:newContacts
                })
            }
            throw createError(404,'record not found.');

    }
    catch(err){
        if(err instanceof mongoose.CastError){
            return next(createError(400,'Invalid Id.'));
        }
        next(err)
    }
}
exports.deleteContact=async(req,res,next)=>{
    try{
        const _id=req.params.id
        let contact=await contacts.findByIdAndDelete({_id});
            if(contact){
                res.status(200).json({
                    message: "deleted successfully",
                    data:contact
                })
            }
            throw createError(404,'Record not found');
    }
    catch(err){
        if(err instanceof mongoose.CastError){
            return next(createError(400,'Invalid Id.'));
        }
        next(err)
    }
}

exports.getAllContact=async(req,res,next)=>{
    try{
        let contact=await contacts.find({});
        if(contact.length<1){
            throw createError(404,'record not found')
        }
            res.status(200).json({count: contact.length, data: contact})
    }
    catch(err){
        next(err)
    }
}

exports.addAddress=async(req,res,next)=>{
    try{
        const add=new address({
            applicantId: req.body.applicantId,
            addrssLine1: req.body.addrssLine1,
            addrssLine2: req.body.addrssLine2,
            zipCode: req.body.zipCode,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country
        })
        let newAddress=await add.save();
        res.status(201).json({
            message: "Created successfully",
            data: newAddress
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
exports.updateAddress=async(req,res,next)=>{
    try{
        const _id=req.params.id
        const newAddress=await address.findByIdAndUpdate({_id}, 
            req.body,
            {new:true}
        );
            if(newAddress){
                res.status(201).json({
                    message: "updated successfully",
                    data:newAddress
                })
            }
            throw createError(404,'record not found.');

    }
    catch(err){
        if(err instanceof mongoose.CastError){
            return next(createError(400,'Invalid Id.'));
        }
        next(err)
    }
}
exports.deleteAddress=async(req,res,next)=>{
    try{
        const _id=req.params.id
        let add=await address.findByIdAndDelete({_id});
            if(add){
                res.status(200).json({
                    message: "deleted successfully",
                    data:add
                })
            }
            throw createError(404,'Record not found');
    }
    catch(err){
        if(err instanceof mongoose.CastError){
            return next(createError(400,'Invalid Id.'));
        }
        next(err)
    }
}

exports.getAllAddress=async(req,res,next)=>{
    try{
        let add=await address.find({});
        if(add.length<1){
            throw createError(404,'record not found')
        }
            res.status(200).json({count: add.length, data: add})
    }
    catch(err){
        next(err)
    }
}

exports.addLocation=async(req,res,next)=>{
    try{
        const location=new locations({
            location: req.body.location
        })
        let exist=await locations.find({location:req.body.location});
        if(exist.length>0){
            throw createError(403, "Already exist add new");
        }
        let newLocations=await location.save();
        res.status(201).json({
            message: "Created successfully",
            data: newLocations
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
exports.updateLocation=async(req,res,next)=>{
    try{
        const _id=req.params.id;
        let exist=await locations.find({location:req.body.location});
        let loc=await locations.find({_id:_id});
        loc=loc[0].location;
        if(exist.length >0 && loc !== req.body.location){
            throw createError(403, "Already exist add new");
        }
        else{
        const newLocations=await locations.findByIdAndUpdate({_id}, 
            req.body,
            {new:true}
        );
            if(newLocations){
                res.status(200).json({
                    message: "updated successfully",
                    data:newLocations
                })
            }
            throw createError(404,'record not found.');
        }
    }
    catch(err){
        if(err instanceof mongoose.CastError){
            return next(createError(400,'Invalid Id.'));
        }
        next(err)
    }
}
exports.deleteLocation=async(req,res,next)=>{
    try{
        const _id=req.params.id
        let location=await locations.findByIdAndDelete({_id});
            if(location){
                res.status(200).json({
                    message: "deleted successfully",
                    data:location
                })
            }
            throw createError(404,'Record not found');
    }
    catch(err){
        if(err instanceof mongoose.CastError){
            return next(createError(400,'Invalid Id.'));
        }
        next(err)
    }
}

exports.getAllLocation=async(req,res,next)=>{
    try{
        let location=await locations.find({});
        if(location.length<1){
            throw createError(404,'record not found')
        }
            res.status(200).json({count: location.length, data: location})
    }
    catch(err){
        next(err)
    }
}

exports.addCategory=async(req,res,next)=>{
    try{
        const cat=new category({
            category: req.body.category
        })
        let exist=await category.find({category:req.body.category});
        if(exist.length>0){
            throw createError(403, "Already exist add new");
        }
        let newCategory=await cat.save();
        res.status(201).json({
            message: "Created successfully",
            data: newCategory
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
exports.updateCategory=async(req,res,next)=>{
    try{
        const _id=req.params.id
        let exist=await category.find({location:req.body.category});
        let cat=await category.find({_id:_id});
        cat=cat[0].category;
        if(exist.length>0 && cat != req.body.category){
            throw createError(403, "Already exist add new");
        }
        const newCategory=await category.findByIdAndUpdate({_id}, 
            req.body,
            {new:true}
        );
            if(newCategory){
                res.status(201).json({
                    message: "updated successfully",
                    data:newCategory
                })
            }
            throw createError(404,'record not found.');

    }
    catch(err){
        if(err instanceof mongoose.CastError){
            return next(createError(400,'Invalid Id.'));
        }
        next(err)
    }
}
exports.deleteCategory=async(req,res,next)=>{
    try{
        const _id=req.params.id
        let category=await category.findByIdAndDelete({_id});
            if(category){
                res.status(200).json({
                    message: "deleted successfully",
                    data:category
                })
            }
            throw createError(404,'Record not found');
    }
    catch(err){
        if(err instanceof mongoose.CastError){
            return next(createError(400,'Invalid Id.'));
        }
        next(err)
    }
}

exports.getAllCategory=async(req,res,next)=>{
    try{
        let add=await category.find({});
        if(category.length<1){
            throw createError(404,'record not found')
        }
            res.status(200).json({count: category.length, data: category})
    }
    catch(err){
        next(err)
    }
}