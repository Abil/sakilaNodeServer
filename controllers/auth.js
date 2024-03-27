import User from "../models/user.js";
import { hashPassword, comparePassword } from "../utils/auth.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
  try {
    // 1. destructure name, email, password from req.body
    const { email, name, password } = req.body;
    // 2. all fields require validation

    if (!email) {
      return res.json({ error: "Email is required" });
    }
    if (!name.trim()) {
      return res.json({ error: "Name is required" });
    }
    if (!password || password.length < 6) {
      return res.json({ error: "Password must be at least 6 characters long" });
    }
    // 3. check if email is taken
    const existingUser = await User.findOne({
      where: { email },
    });
    if (existingUser) {
      return res.status(404).json({ error: "Email is taken" });
    }
    // 4. hash password
    const hashedPassword = await hashPassword(password);
    // 5. register user
    // const user = await new User({
    //   name,
    //   email,
    //   password: hashedPassword,
    // }).save();

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 6. create signed jwt
    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // 7. send response
    res.json({
      user: {
        name: user.name,
        email: user.email,
        admin: user.admin,
      },
      token,
    });
  } catch (err) {
    console.log(err);
  }
};

export const login = async (req, res) => {
  try {
    // 1. destructure name, email, password from req.body
    const { email, password } = req.body;
    // 2. all fields require validation
    if (!email) {
      return res.json({ error: "Email is required" });
    }
    if (!password || password.length < 6) {
      return res.json({ error: "Password must be at least 6 characters long" });
    }
    // 3. check if email is taken
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return res.json({ error: "User not found" });
    }
    // 4. compare password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({ error: "Wrong password" });
    }
    // 5. create signed jwt
    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // 7. send response
    res.json({
      user: {
        name: user.name,
        email: user.email,
        admin: user.admin,
      },
      token,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findByPk(req.user._id);

    // check password length
    if (password && password.length < 6) {
      return res.json({
        error: "Password is required and should be min 6 characters long",
      });
    }

    // hash the password
    const hashedPassword = password ? await hashPassword(password) : undefined;

    user.password = hashedPassword || user.password;
    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();
    delete user.dataValues.password; //Interesting
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

// Delete an existing user
export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  if (req.user._id == userId) {
    return res.status(404).json({ error: "Can not delete yourself" });
  }
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
