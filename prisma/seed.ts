import { PrismaClient, LuxuryTheme } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.themePreference.upsert({
    where: { userEmail: "store@fabrixly.com" },
    update: {},
    create: {
      userEmail: "store@fabrixly.com",
      reducedMotion: false,
      preferredTheme: LuxuryTheme.DARK_LUXE
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
