import { prisma } from "../config/prisma";


export const findAllPlayers = async () => {
    try {
        const players = await prisma.player.findMany();
        return players;
    } catch (error) {
        console.error("Error retrieving players:", error);
        throw error;
    }
}

export const findPlayerByExternalId = async (externalId: number) => {
    try {
        const player = await prisma.player.findUnique({
            where: {
                externalId: externalId
            }
        });
        return player;
    } catch (error) {
        console.error("Error retrieving player by externalId:", error);
        throw error;
    }
}

export const findPlayersByTeam = async (team: string) => {
    try {
        const teamAbbreviation = await prisma.team.findMany({
            where: {
                abbreviation: team
            }
        });
        const players = await prisma.player.findMany({
            where: {
                team: teamAbbreviation[0].name
            }
        });
        return players;
    } catch (error) {
        console.error("Error retrieving players by team:", error);
        throw error;
    }
}

export const findPlayersByPosition = async (position: string) => {
    try {
        const normalizedPosition = position.toUpperCase();

        if (!["G", "F", "C"].includes(normalizedPosition)) {
            throw new Error("Invalid position. Must be G, F, or C.");
        }

        const players = await prisma.player.findMany({
            where: {
                position: {
                    contains: normalizedPosition,
                    mode: "insensitive",
                },
            },
        });

        return players;
    } catch (error) {
        console.error("Error retrieving players by position:", error);
        throw error;
    }
};