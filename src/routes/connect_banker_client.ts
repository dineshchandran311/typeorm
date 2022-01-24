import express from "express";
import { Client } from "../entities/client";
import { Banker } from "../entities/banker";

const router = express.Router();

router.put("/api/banker/:bankerid/client/:clientid", async (req, res) => {
  const { bankerid, clientid } = req.params;

  const client = await Client.findOne(parseInt(clientid));

  const banker = await Banker.findOne(parseInt(bankerid));

  if (banker && client) {
    banker.clients = [client];
    await banker.save();
    res.json({
      message: "Banker Connected Client",
    });
  } else {
    res.json({
      message: "Banker or client not found",
    });
  }
});

export { router as connectBankerClientRouter };
