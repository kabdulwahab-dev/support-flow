import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userRepository = {
  findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  },
  create(input: { email: string; passwordHash: string, country?: string }) {
    return prisma.user.create({
      data: input,
    });
  },
};


