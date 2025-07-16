import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../modals/User.js';

export const signup = async (req, res) => {
  try {
    const { name, email, password, role, district } = req.body;
    console.log(req.body);

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      district: role === "district_admin" ? district : undefined,
    });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "super_secret_key", {
      expiresIn: "7d"
    });

    res.status(201).json({ success: true, token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "super_secret_key", {
      expiresIn: "7d"
    });

    res.status(200).json({ success: true, token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
