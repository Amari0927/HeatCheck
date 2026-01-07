import { Router } from "express";
import {createShot } from "../controllers/shots.controller";

const router = Router();

router.post("/api/shots", createShot);

/*

router.get("/api/hello", helloWorld);*/
export default router;