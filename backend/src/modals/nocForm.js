import mongoose from "mongoose";

const nocFormSchema = new mongoose.Schema({
  typeOfProject: { type: String, required: true },
  language: { type: String, required: true },
  genre: { type: String, required: true },
  duration: { type: String, required: true }, // e.g., "90 mins"

  title: { type: String, required: true, unique: true },
  directorAndMainCast: { type: String, required: true },
  producerHouse: { type: String, required: true },

  synopsis: { type: String, maxlength: 250, required: true },
  contactOfProductionHouse: { type: String, required: true },
  productionHouseAddress: { type: String, required: true },
  emailOfProductionHouse: { type: String, required: true },

  productionHouseConstitution: { type: String, required: true },
  registrationNumber: { type: String, required: true },

  representativeName: { type: String, required: true },
  designationOfApplicant: { type: String, required: true },
  addressOfApplicant: { type: String, required: true },
  contactOfApplicant: { type: String, required: true, unique: true },
  emailOfApplicant: { type: String, required: true, unique: true },

  briefSynopsis: { type: String, maxlength: 500, required: true },
  mainArtistsAtLocation: { type: String, required: true },

  numberOfShootingLocations: { type: Number, required: true }, // Annexure A

  dronePermissionRequired: { type: String, required: true },
  animalPartOfShooting: { type: String, required: true },
  fireOrBlastingScene: { type: String, required: true },
  temporaryStructureCreation: { type: String, required: true },

  otherDetails: { type: String }, // e.g., roadblocks etc.

  lineProducerDetails: { type: String },
  policeOrSecurityRequirement: { type: String },
  siteContactPersonDetails: { type: String },

  mibCertificate: { type: String }, // URL of uploaded PDF/Image
  meaCertificate: { type: String }, // URL of uploaded PDF/Image

  inFilmBrandingOrAssetUse: { type: String },
  otherParticulars: { type: String },

  authorizedApplicantName: { type: String, required: true },
  seal: { type: String }, // could also be image URL if uploaded
  signature: { type: String }, // could also be image URL if uploaded

  // anexure data

  location: { type: String, required: true },
  landmark: { type: String },
  locationType: { type: String, enum: ["Indoor", "Outdoor", "Both"] },
  startDateTime: { type: Date },
  endDateTime: { type: Date },
  crewInvolvement: { type: String },
  personCount: { type: Number },
  permissionDetails: { type: String },
  locationFee: { type: String },
  securityDeposit: { type: String },
  paymentRef: { type: String },
  locationManager: { type: String },
  sceneDetails: { type: String },
  forestType: { type: String },
  forestDetails: { type: String },

 forwarding: {
  forwardedTo: {
    type: Map,
    of: [String], // e.g., { Patna: ["DM", "SP"], Gaya: ["DOP", "DTO"] }
    default: {},
  },
  forwardedAt: {
    type: Date,
  },
  rejectedAt: {
    type: Date,
  },
  rejectedBy: {
    type: String,
  },
},
status: {
  type: String,
  enum: ["submitted", "forwarded", "approved", "rejected"],
  default: "submitted",
},
remarks: {
  type: String,
},



  date: { type: Date, required: true, default: Date.now },
});

const NocForm = mongoose.model("NocForm", nocFormSchema);

export default NocForm;
