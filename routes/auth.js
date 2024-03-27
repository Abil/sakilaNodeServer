import express from "express";

const router = express.Router();

// middlewares
import { requireSignin, isAdmin } from "../middlewares/auth.js";

// controllers
import {
  register,
  login,
  updateProfile,
  deleteUser,
} from "../controllers/auth.js";

router.post("/register", register);
router.post("/login", login);

router.get("/auth-check", requireSignin, (req, res) => {
  res.json({ ok: true });
});
router.get("/admin-check", requireSignin, isAdmin, (req, res) => {
  res.json({ ok: true });
});

router.delete("/user/:userId", requireSignin, isAdmin, deleteUser);

router.put("/profile", requireSignin, updateProfile);

export default router;
