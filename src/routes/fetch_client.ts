import express from "express";
import { Client } from "../entities/client";

import { createQueryBuilder } from "typeorm";

const router = express.Router();

router.get("/api/clients", async (req, res) => {
  const client = await createQueryBuilder("client")
    // select('client') to get all
    .select("client.first_name")
    .addSelect("client.last_name")
    .from(Client, "client")
    .leftJoinAndSelect("client.transactions", "transactions") // joining transactions and display in name alias transactions
    .where("client.balance <= :balance AND client.balance >= :minBalance", {
      balance: 10000,
      minBalance: 0,
    })
    .getMany();

  res.json(client);
});

export { router as fetchClientRouter };
