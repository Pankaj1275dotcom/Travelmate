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
        const message =
            "❌ Database Connection Failed. Check DATABASE_URL, database host reachability, and whether the DB is publicly accessible from Render. If you are using Aiven/MySQL, ensure the host/port is allowed and the server is reachable from the deployment environment.";

        console.error(message);
        console.error(error);

        process.exit(1);
    }
}

start();