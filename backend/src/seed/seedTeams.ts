import { PythonShell } from "python-shell";
import { prisma } from "../config/prisma";

async function seedTeams() {
    try {
        const results = await PythonShell.run("python/fetch_teams.py", {
            pythonPath:"/Users/amarimottley/Desktop/HeatCheck/backend/python/.venv/bin/python"
        });

        const teams = JSON.parse(results.join(""));
        for (const team of teams) {
        await prisma.team.upsert({
            where: { externalId: team.externalId },
            update: team,
            create: team,
        });
        }
        console.log("Teams seeded successfully!");
    } catch (error) {
        console.error("Python error:", error);
    }
}

seedTeams();