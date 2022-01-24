import express from "express";
import { Client } from "../entities/client";
import { Transaction, TransactionTypes } from "../entities/Transaction";

const router = express.Router();

router.post("/api/client/:clientId/transaction", async (req, res) => {
  const { clientId } = req.params;

  const { type, amount } = req.body;

  const client = await Client.findOne(parseInt(clientId));

  if (!client) {
    res.json({
      message: "Client not found",
    });
  } else {
    const transaction = Transaction.create({
      amount,
      type,
      client,
    });

    await transaction.save();

    if (type === TransactionTypes.DEPOSIT) {
      client.balance = parseInt(client.balance.toString()) + parseInt(amount);
    } else if (type === TransactionTypes.WITHDRAW) {
      if (client.balance - amount >= 0) {
        client.balance = parseInt(client.balance.toString()) - parseInt(amount);
      } else {
        res.json({
          message: "Insufficient amount",
        });
      }
    }

    await client.save();

    res.json({
      message: "Transaction success",
    });
  }
});

export { router as createTransactionRouter };
