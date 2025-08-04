
import cloudinary from "../config/cloudinary.js";
import NocForm from "../modals/nocForm.js";
import fs from "fs";

const uploadToCloudinary = async (filePath, folder = "noc_files") => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "nocForms",
    resource_type: "auto",
    type: "upload", // ensures public access
  });
  // Remove local file after uploading to the cloud (cloudinary) unlinkSync() => delete
  fs.unlinkSync(filePath);
  return result.secure_url;
};

// POST Route to save all the NOC Form dara in the Database

export const addNocForm = async (req, res) => {
  try {
    const {
      typeOfProject,
      language,
      genre,
      duration,
      title,
      directorAndMainCast,
      producerHouse,
      synopsis,
      contactOfProductionHouse,
      productionHouseAddress,
      emailOfProductionHouse,
      productionHouseConstitution,
      registrationNumber,
      representativeName,
      designationOfApplicant,
      addressOfApplicant,
      contactOfApplicant,
      emailOfApplicant,
      briefSynopsis,
      mainArtistsAtLocation,
      numberOfShootingLocations,
      dronePermissionRequired,
      animalPartOfShooting,
      fireOrBlastingScene,
      temporaryStructureCreation,
      otherDetails,
      lineProducerDetails,
      policeOrSecurityRequirement,
      siteContactPersonDetails,
      inFilmBrandingOrAssetUse,
      otherParticulars,
      authorizedApplicantName,
      date,
      location,
      landmark,
      locationType,
      startDateTime,
      endDateTime,
      crewInvolvement,
      personCount,
      permissionDetails,
      locationFee,
      securityDeposit,
      paymentRef,
      locationManager,
      sceneDetails,
      forestType,
      forestDetails
    } = req.body;

    console.log(req.body);

    // Upload files to Cloudinary (check if they exist in req.files)
    const files = req.files;
    console.log(req.files);

    const mibCertificate = files?.mibCertificate
      ? await uploadToCloudinary(files.mibCertificate[0].path)
      : null;

    const meaCertificate = files?.meaCertificate
      ? await uploadToCloudinary(files.meaCertificate[0].path)
      : null;

    const seal = files?.seal
      ? await uploadToCloudinary(files.seal[0].path)
      : null;

    const signature = files?.signature
      ? await uploadToCloudinary(files.signature[0].path)
      : null;

    // Create document
    const newForm = new NocForm({
      typeOfProject,
      language,
      genre,
      duration,
      title,
      directorAndMainCast,
      producerHouse,
      synopsis,
      contactOfProductionHouse,
      productionHouseAddress,
      emailOfProductionHouse,
      productionHouseConstitution,
      registrationNumber,
      representativeName,
      designationOfApplicant,
      addressOfApplicant,
      contactOfApplicant,
      emailOfApplicant,
      briefSynopsis,
      mainArtistsAtLocation,
      numberOfShootingLocations,
      dronePermissionRequired,
      animalPartOfShooting,
      fireOrBlastingScene,
      temporaryStructureCreation,
      otherDetails,
      lineProducerDetails,
      policeOrSecurityRequirement,
      siteContactPersonDetails,
      mibCertificate,
      meaCertificate,
      inFilmBrandingOrAssetUse,
      otherParticulars,
      authorizedApplicantName,
      seal,
      signature,
      date: date || new Date(),
      location,
      landmark,
      locationType,
      startDateTime,
      endDateTime,
      crewInvolvement,
      personCount,
      permissionDetails,
      locationFee,
      securityDeposit,
      paymentRef,
      locationManager,
      sceneDetails,
      forestType,
      forestDetails
    });

    await newForm.save();

    res.status(201).json({
      success: true,
      message: "NOC Form submitted successfully",
      data: newForm,
    });
  } catch (error) {
    console.error("Error submitting NOC form:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit NOC form",
      error: error.message,
    });
  }
};

// GET route to get retrieve all the NOC forms
export const getAllNocFroms = async (req,res) => {
    try {
     const forms = await NocForm.find();
     res.status(201).json({
      success: true,
      message: "Got all the NOC forms",
      data: forms,
    });
    } catch (error) {
      res.status(500).json({
      success: false,
      message: "Error getting NOC forms",
      error: error.message,
    });
    }
}

// GET route to get all the NOC forms by ID (/:id) [We are using Email ID of the user as ID];

export const getAllFormsByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required." });
    }

    const forms = await NocForm.find({ emailOfApplicant: email });

    if (forms.length === 0) {
      return res.status(404).json({ success: false, message: "No forms found for this email id ! Make sure the email id correct." });
    }

    res.status(200).json({
      success: true,
      message: "Forms fetched successfully",
      data: forms,
    });
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch forms ! Please check the code",
      error: error.message,
    });
  }
};

// PUT route for updating the data of the form by id (not email id);

export const updateNocFormById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedForm = await NocForm.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedForm) {
      return res.status(404).json({ success: false, message: "NOC Form not found ! Make sure everyting is correct" });
    }

    res.status(200).json({
      success: true,
      message: "NOC Form updated successfully",
      data: updatedForm,
    });
  } catch (error) {
    console.error("Error updating NOC form:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update NOC form",
      error: error.message,
    });
  }
};

// DELETE Route for deleting the form by id (not email id)

// controller/nocFormController.js
export const deleteNocFormById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedForm = await NocForm.findByIdAndDelete(id);

    if (!deletedForm) {
      return res.status(404).json({ success: false, message: "NOC Form not found" });
    }

    res.status(200).json({
      success: true,
      message: "NOC Form deleted successfully",
      data: deletedForm,
    });
  } catch (error) {
    console.error("Error deleting NOC form:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete NOC form",
      error: error.message,
    });
  }
};


// forwardNocForm logic 


export const forwardNocForm = async (req, res) => {
  try {
    const { forwardedTo } = req.body; // Example: { Patna: ["DM", "DTO"], Gaya: ["DOP"] }
    const { id } = req.params;

    console.log(forwardedTo);
    console.log(id);

    if (!forwardedTo || typeof forwardedTo !== 'object' || Object.keys(forwardedTo).length === 0) {
      return res.status(400).json({ message: "At least one district with departments is required" });
    }

    const updatedForm = await NocForm.findByIdAndUpdate(
      id,
      {
        "forwarding.forwardedTo": forwardedTo,
        "forwarding.forwardedAt": new Date(),
        status: "forwarded",
      },
      { new: true }
    );

    if (!updatedForm) {
      return res.status(404).json({ message: "NOC form not found" });
    }

    res.status(200).json({
      success: true,
      message: "Form forwarded successfully",
      data: updatedForm,
    });
  } catch (error) {
    console.error("Error forwarding NOC form:", error);
    res.status(500).json({ success: false, message: "Failed to forward form" });
  }
};


// NocForm rejected logic

export const rejectNocForm = async (req, res) => {
  try {
    const { remarks, rejectedBy } = req.body;
    const { id } = req.params;

    const updatedForm = await NocForm.findByIdAndUpdate(
      id,
      {
        status: "rejected",
        remarks: remarks || "No reason provided",
        forwarding: {
          ...req.body.forwarding, // in case district admin also sends district info
          rejectedAt: new Date(),
          rejectedBy: rejectedBy || "admin",
        },
      },
      { new: true }
    );

    if (!updatedForm) {
      return res.status(404).json({ message: "NOC form not found" });
    }

    res.status(200).json({
      success: true,
      message: "Form rejected successfully",
      data: updatedForm,
    });
  } catch (error) {
    console.error("Error rejecting NOC form:", error);
    res.status(500).json({ success: false, message: "Failed to reject form" });
  }
};


// noc form getbyDistcrict

export const getFormsByDistrict = async (req, res) => {
  try {
    const { districtName } = req.params;

    const forms = await NocForm.find({
      "forwarding.district": districtName,
    });

    res.status(200).json(forms);
  } catch (error) {
    console.error("Error fetching forwarded forms:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
