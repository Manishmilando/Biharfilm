import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
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
  district: {
    type: String,
    required: function () {
      return this.role === "district_admin";
    }
  }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
