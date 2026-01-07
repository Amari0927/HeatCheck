import { Request, Response } from "express";
import { insertShot, getShots } from "../services/shots.service";

export const createShot = async (req: Request, res: Response) => {
    try {
        const shotData = req.body;
        if (!shotData.playerId || !shotData.gameId || shotData.x === undefined || shotData.y === undefined || 
            shotData.made === undefined || shotData.quarter === undefined || !shotData.timeStamp) {
            return res.status(400).json({ message: "Missing required shot data" });
        }
        const shot = await insertShot(shotData);
        res.json({ message: "Shot created successfully", shot });
    } catch (error) {
        res.status(500).json({ message: "Database error", error });
        
    }
}

export const getAllShots = async (req: Request, res: Response) => {
    try {
        const shots = await getShots();
        res.json(shots);
    } catch (error) {
        res.status(500).json({ message: "Database error", error });
    }
}



