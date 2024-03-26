import express from "express";

import {
  createActorAward,
  getActorAward,
  updateActorAward,
  deleteActorAward,
} from "../controllers/actorAward.js";

const router = express.Router();

router.post("/", createActorAward);
router.get("/:actorId", getActorAward);
router.put("/:actorId", updateActorAward);
router.delete("/:actorId", deleteActorAward);

export default router;
