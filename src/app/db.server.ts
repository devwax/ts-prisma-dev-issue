import { PrismaClient } from "@prisma/client";
import { fieldEncryptionExtension } from "prisma-field-encryption";
import type * as Prisma from "@prisma/client";

// https://stackoverflow.com/a/68328575/2480125
declare global {
    var prisma: Prisma.PrismaClient;
}

function createPrismaInstance(): Prisma.PrismaClient {
  // The solution was to return prisma as Prisma.PrismaClient (Copilot explained that the .$extends method could return different type, so 'as Prisma.PrismaClient' was needed to ensure the type was correct)
  const prisma = new PrismaClient().$extends(fieldEncryptionExtension({encryptionKey: 'k1.aesgcm256.5Xnyea7zJxVluFXDu9y259HdZwiLlR90nMhqUPc8Ubs='}));
  return prisma as Prisma.PrismaClient;
}

// const prisma = global.prisma || createPrismaInstance();
const prisma = global.prisma || createPrismaInstance();

if (process.env.NODE_ENV !== "production") {
    if (!global.prisma) {
        global.prisma = createPrismaInstance();
    }
}

export default prisma;
