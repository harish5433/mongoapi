const express=require("express")
const router=express.Router()
const jobsController=require("./../controller/jobsController")

// user routes
router.get("/jobs", jobsController.getAllJobs);
router.get("/company/jobs", jobsController.getCompanyJob);
router.post("/jobs", jobsController.addjob);

module.exports=router