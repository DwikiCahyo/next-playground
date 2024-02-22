import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  const { id } = req.query;
  const { name, address } = req.body;
  try {
    const store = await prisma.store.findUnique({
      where: {
        id: parseInt(id as string),
      },
    });
    res.status(201).json({ message: "Success", metadata: store });
  } catch (e) {
    if (e instanceof PrismaClientInitializationError) {
      res.status(500).json({ error: `${e.message}` });
    }
  }

  if (req.method === "PUT" || req.method === "PATCH") {
    try {
      const updatedStore = await prisma.store.update({
        where: {
          id: parseInt(id as string),
        },
        data: {
          name,
          address,
        },
      });
      res.status(201).json({
        message: "Success Updated",
        metadata: {
          id: updatedStore.id,
          name: updatedStore.name,
          address: updatedStore.address,
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientInitializationError) {
        res.status(500).json({ error: `${e.message}` });
      }
    }
  }
}
