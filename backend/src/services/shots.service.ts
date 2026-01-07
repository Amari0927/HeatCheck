import { prisma } from "../config/prisma";


interface ShotData {
    playerId: number;
    gameId: number;
    x: number;
    y: number;
    made: boolean;
    quarter: number;
    timeStamp: string;
}

export const insertShot = async (shotData: ShotData) => {
    try {
        await prisma.shot.create({
            data: {
                player: {
                        connect: {
                            id: shotData.playerId,
                        }
                },
                game: {
                    connect: {
                        id: shotData.gameId,
                    }
                },
                
                x: shotData.x,
                y: shotData.y,
                made: shotData.made,
                quarter: shotData.quarter,
                timeStamp: shotData.timeStamp
            }
        });
    } catch (error) {
        console.error("Error inserting shot:", error);
        throw error;
    }
    
}

export const getShots = async () => {
    try {
        
    } catch (error) {
        
    }
}