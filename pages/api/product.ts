import { Db, MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const client = await MongoClient.connect(
      "mongodb+srv://next:dwiki123@cluster0.mwdzsye.mongodb.net/learn?retryWrites=true&w=majority"
    );

    const db = client.db();

    await db.collection("products").insertOne({ name: "Product 1" });
    client.close();
    res.status(201).json({ mssg: "Succes Post" });
  }

  res.status(200).json({ name: "John Doe" });
}

export default handler;
