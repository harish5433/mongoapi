const express=require("express")
const router=express.Router()
const profileController=require("./../controller/profileController")

// user routes
router.get("/applicants/skill", profileController.getAllSkills);
router.post("/applicants/skill", profileController.addskill);
router.put("/applicants/skill/:id", profileController.updateSkill);
router.delete("/applicants/skill/:id", profileController.deleteSkill);

router.get("/applicants/contact", profileController.getAllContact);
router.post("/applicants/contact", profileController.addContact);
router.put("/applicants/contact/:id", profileController.updateContact);
router.delete("/applicants/contact/:id", profileController.deleteContact);

router.get("/applicants/address", profileController.getAllAddress);
router.post("/applicants/address", profileController.addAddress);
router.put("/applicants/address/:id", profileController.updateAddress);
router.delete("/applicants/address/:id", profileController.deleteAddress);

router.get("/locations", profileController.getAllLocation);
router.post("/locations", profileController.addLocation);
router.put("/locations/:id", profileController.updateLocation);
router.delete("/locations/:id", profileController.deleteLocation);

router.get("/category", profileController.getAllCategory);
router.post("/category", profileController.addCategory);
router.put("/category/:id", profileController.updateCategory);
router.delete("/category/:id", profileController.deleteCategory);

module.exports=router