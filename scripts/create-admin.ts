import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";
import "dotenv/config";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || "file:./dev.db",
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const email = "admin@fasonbul.com";
  const password = "Admin123!";
  const name = "Site Admin";

  console.log("Creating admin user...");
  console.log("Email:", email);
  console.log("Password:", password);

  const passwordHash = await bcrypt.hash(password, 12);

  const adminUser = await prisma.adminUser.upsert({
    where: { email },
    update: {
      passwordHash,
      name,
    },
    create: {
      email,
      passwordHash,
      name,
      role: "ADMIN",
    },
  });

  console.log("Admin user created successfully!");
  console.log("ID:", adminUser.id);
  console.log("Email:", adminUser.email);
  console.log("Name:", adminUser.name);
  console.log("");
  console.log("You can now login at /admin/login with:");
  console.log("  Email: admin@fasonbul.com");
  console.log("  Password: Admin123!");
}

main()
  .catch((e) => {
    console.error("Error creating admin:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
