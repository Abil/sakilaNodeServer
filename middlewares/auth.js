import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const requireSignin = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json(err);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user._id);
    if (!user.admin) {
      return res
        .status(401)
        .json({ message: "You are not Unauthorized to perform the action" });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};
