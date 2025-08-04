import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
 
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  role: {
    type: String,
    enum: ["admin", "district_admin", "filmmaker", "vendor", "artist"],
    required: [true, "Role is required"]
  },
  
}, { timestamps: true });

export default mongoose.model("User", userSchema);
