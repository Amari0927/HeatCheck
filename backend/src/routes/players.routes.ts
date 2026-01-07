import { Router } from "express";

import { getAllPlayers, getPlayer, getPlayersByTeam, getPlayersByPosition } from "../controllers/players.controller";

const router = Router();

router.get("/", getAllPlayers);
router.get("/:externalId", getPlayer);
router.get("/team/:team", getPlayersByTeam);
router.get("/position/:position", getPlayersByPosition);

export default router;