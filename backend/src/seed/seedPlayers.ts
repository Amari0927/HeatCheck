import { PythonShell } from "python-shell";
import { prisma } from "../config/prisma";

async function seedPlayers() {
    try {
        const results = await PythonShell.run("python/fetch_players.py", {
            pythonPath:"/Users/amarimottley/Desktop/HeatCheck/backend/python/.venv/bin/python"
        });

        const players = JSON.parse(results.join(""));
        for (const player of players) {
        await prisma.player.upsert({
            where: { externalId: player.externalId },
            update: player,
            create: player,
        });
        }
        console.log("Players seeded successfully!");
    } catch (error) {
        console.error("Python error:", error);
    }
}

seedPlayers();