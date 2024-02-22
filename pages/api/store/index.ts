import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient } from "@prisma/client";
import { log } from "console";

const prisma = new PrismaClient();

type Store = {
  name: string;
  address: string;
};

type ResponseStore = {
  message: string;
  store?: Store;
};

type ResponseError = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const reqBody = req.body;
  const id = req.query.id;
  if (req.method === "POST") {
    try {
      await prisma.store.create({
        data: {
          name: reqBody.name,
          address: reqBody.address,
          product: {
            create: {
              slug: "product-test",
              name: "Product Test",
              description: "Product test description",
              price: 20000,
            },
          },
        },
      });

      res.status(200).json({
        message: "Succes add new store",
        store: { name: reqBody.name, address: reqBody.address },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        res.status(500).json({ error: `${e.message}` });
      }
    }
  }

  if (req.method === "GET") {
    try {
      const stores = await prisma.store.findMany();
      res.status(201).json({ message: "Success", data: stores });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientInitializationError) {
        res.status(500).json({ error: `${e.message}` });
      }
    }
  }
}

// model Post {
//   id        Int      @id @default(autoincrement())
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
//   title     String   @db.VarChar(255)
//   content   String?
//   published Boolean  @default(false)
//   author    User     @relation(fields: [authorId], references: [id])
//   authorId  Int
// }

// model Profile {
//   id     Int     @id @default(autoincrement())
//   bio    String?
//   user   User    @relation(fields: [userId], references: [id])
//   userId Int     @unique
// }

// model User {
//   id      Int      @id @default(autoincrement())
//   email   String   @unique
//   name    String?
//   posts   Post[]
//   profile Profile?
// }
