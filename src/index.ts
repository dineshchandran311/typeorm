import { createConnection } from "typeorm";
import { Banker } from "./entities/banker";
import { Client } from "./entities/client";
import { Transaction } from "./entities/Transaction";
import express from "express";
import { createClientRouter } from "./routes/create_client";
import { createBankerRouter } from "./routes/create_banker";
import { createTransactionRouter } from "./routes/create_transaction";
import { connectBankerClientRouter } from "./routes/connect_banker_client";
import { deleteClientRouter } from "./routes/delete_client";
import { fetchClientRouter } from "./routes/fetch_client";

const app = express();
const port = process.env.PORT || 8080;

const main = async () => {
  try {
    const connection = await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "1234",
      database: "typeorm",
      entities: [Client, Banker, Transaction],
      synchronize: true,
    });
    console.log("Connected to Postgres");

    app.use(express.json());

    app.use("/", createClientRouter);
    app.use("/", fetchClientRouter);
    app.use("/", deleteClientRouter);
    app.use("/", createBankerRouter);
    app.use("/", createTransactionRouter);
    app.use("/", connectBankerClientRouter);

    app.listen(port, () => console.log(`Listening on port  ${port}`));
  } catch (error) {
    console.log(error);
    throw new Error("Could not connect to Postgres");
  }
};

main();
