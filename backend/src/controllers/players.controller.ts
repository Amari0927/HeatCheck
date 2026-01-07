import { Request, Response } from "express";
import { findAllPlayers, findPlayerByExternalId, findPlayersByTeam, findPlayersByPosition } from "../services/players.service";


export const getAllPlayers = async (req: Request, res: Response) => {
    try {
        const players = await findAllPlayers();
        res.status(200).json(players);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: "Database error" });
    }
};

export const getPlayer = async (req: Request, res: Response) => {
    try {
        const externalId = req.params.externalId;
        if (!externalId) {
            return  res.status(400).json({ message: "Missing required externalId parameter" });
        }

        const player = await findPlayerByExternalId(Number(externalId));
        res.status(200).json(player);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: "Database error" });
    }
}

export const getPlayersByTeam = async (req: Request, res: Response) => {
    try {
        const team = req.params.team;
        if (!team) {
            return res.status(400).json({ message: "Missing required team parameter" });
        }

        const players = await findPlayersByTeam(team);
        res.status(200).json(players);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: "Database error" });
    }
}

export const getPlayersByPosition = async (req: Request, res: Response) => {
    try {
        const position = req.params.position;
        if (!position) {
            return res.status(400).json({ message: "Missing required position parameter" });
        }

        const players = await findPlayersByPosition(position);
        res.status(200).json(players);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: "Database error" });
    }
}