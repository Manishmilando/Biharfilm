import express from "express";
import { addNocForm, getAllNocFroms, getAllFormsByEmail, updateNocFormById, deleteNocFormById, forwardNocForm, rejectNocForm } from "../controller/nocFormController.js";
import upload from "../middlewares/multer.js";  
import { authenticate, authorizeRoles } from '../middlewares/auth.js';

const router = express.Router();

// we are going to Accept multiple files using upload.fields()
router.post(
  "/addNocForm",
  (req, res, next) => {
    console.log(" Upload starting... ! Files are reached to backend, route is hitting");
    next();
  },
  upload.fields([
    { name: "mibCertificate", maxCount: 1 },
    { name: "meaCertificate", maxCount: 1 },
    { name: "seal", maxCount: 1 },
    { name: "signature", maxCount: 1 },
  ]),
  addNocForm
); 

router.get("/getAllNocFroms",  getAllNocFroms); // working 
router.get("/getForms/:email", getAllFormsByEmail); // get form by email id [working]
router.put("/updateNocForm/:id", updateNocFormById);
router.delete("/deleteNocForm/:id", deleteNocFormById);

// router.put("/forward/:id", authenticate, authorizeRoles("admin"), forwardNocForm);
router.put("/forward/:id", forwardNocForm);
router.put("/reject/:id", authenticate, authorizeRoles("admin", "district_admin"), rejectNocForm);


export default router;
