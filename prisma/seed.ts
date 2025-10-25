import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const categories = ["Work", "Personal", "Shopping", "Study", "Other"];

    for (const title of categories) {
        await prisma.category.upsert({
            where: { title },
            update: {},
            create: { title },
        });
    }

}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
