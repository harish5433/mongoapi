const express=require("express")
const router=express.Router()
const applicantController=require("./../controller/applicantController")

// user routes
router.get("/profile/:salt", applicantController.getProfileBySalt);
router.get("/applicants", applicantController.applicant);

module.exports=router