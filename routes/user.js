const express=require("express")
const router=express.Router()
const userController=require("./../controller/userController")

// user routes
router.post("/applicant/register", userController.applicantRegister);
router.post("/company/register", userController.comapnyRegister);
router.post("/users/login", userController.login);
router.post("/users/forget-password", userController.forgetPassword);
router.post("/users/reset-password/:token", userController.resetPassword);
router.get("/users/verify/:token", userController.verify);
router.get("/users", userController.getAllUser);
router.get("/users/:id", userController.getUserByID);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

module.exports=router