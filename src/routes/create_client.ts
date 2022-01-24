import express from "express";
import { Client } from "../entities/client";

const router = express.Router();

router.post("/api/client", async (req, res) => {
  const { firstName, lastName, email, cardNumber, balance } = req.body;

  const client = Client.create({
    first_name: firstName,
    last_name: lastName,
    email,
    card_number: cardNumber,
    balance,
  });

  console.log(client);

  await client.save();

  res.send(client);
});

export { router as createClientRouter };
