import express from "express";
import { isAdmin } from "../middlewares/auth.js";

import {
  createActorAward,
  getActorAward,
  updateActorAward,
  deleteActorAward,
} from "../controllers/actorAward.js";

const router = express.Router();

router.post("/", isAdmin, createActorAward);
router.get("/:actorId", getActorAward);
router.put("/:actorId", isAdmin, updateActorAward);
router.delete("/:actorId", isAdmin, deleteActorAward);

export default router;
