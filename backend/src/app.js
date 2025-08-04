import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import nocFormRoute from "./routes/nocFormRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import artistRoutes from "./routes/artistRoutes.js";

// ✅ 1. Load env variables early — this is correct
dotenv.config();


const app = express();

// ✅ 2. Middleware for JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ 3. CORS — okay for dev, but for prod you should specify exact domains
app.use(cors({
    origin: "*",
    credentials: true,
}));

// ✅ 4. Port fallback — good
const port = process.env.PORT || 3000;

// ✅ 5. Route setup
app.use("/api/auth", authRoutes);
app.use("/api", nocFormRoute);
app.use("/api/artist", artistRoutes);

// ✅ 6. DB connection (use .catch for safety)
const mongodbURL = process.env.MONGODB_URL || "hello world";

mongoose.connect(mongodbURL)
  .then(() => {
    console.log("System is connected to the database");

    // ✅ 7. Start server after DB connects
    app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
  })
  .catch((error) => {
    console.error("❌ Failed to connect to MongoDB:", error.message);
  });
