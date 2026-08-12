import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("\n=== AIVEN DATABASE TABLES ===\n");

    const tables = await prisma.$queryRaw`
        SELECT TABLE_NAME
        FROM information_schema.TABLES
        WHERE TABLE_SCHEMA = 'defaultdb'
        ORDER BY TABLE_NAME;
    `;

    for (const table of tables) {
        console.log(table.TABLE_NAME);
    }

    console.log("\n=== PRISMA MIGRATIONS ===\n");

    const migrations = await prisma.$queryRaw`
        SELECT migration_name, finished_at, rolled_back_at
        FROM _prisma_migrations
        ORDER BY started_at;
    `;

    for (const migration of migrations) {
        console.log(
            migration.migration_name,
            "| finished:",
            migration.finished_at,
            "| rolled back:",
            migration.rolled_back_at
        );
    }
}

main()
    .catch((error) => {
        console.error("\n❌ Database inspection failed:");
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });