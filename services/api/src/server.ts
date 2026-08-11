import "dotenv/config";

import app from "./app.js";
import prisma from "./lib/prisma.js";

const PORT = Number(process.env.PORT) || 5000;

async function start() {
    try {
        await prisma.$connect();

        console.log("✅ Database Connected");

        app.listen(PORT, () => {
            console.log(
                `🚀 Server running at http://localhost:${PORT}`
            );
        });

    } catch (error) {
        console.error(
            "❌ Database Connection Failed"
        );

        console.error(error);

        process.exit(1);
    }
}

start();