const express=require("express")
const router=express.Router()
const companyController=require("./../controller/companyController")

// user routes
router.get("/company/profile/:salt", companyController.getProfileBySalt);
router.get("/company", companyController.company);
module.exports=router