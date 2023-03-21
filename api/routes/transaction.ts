import express from "express";

import TransactionService from "../services/transaction.service";

const transactionRouter = express.Router();

transactionRouter.get("/all", async (_, res) => {
  try {
    const transactions = await TransactionService.getAll();
    res.send(transactions).status(200);
  } catch (error) {
    throw new Error(`Error: Could not get transactions: ${error}`);
  }
});

export default transactionRouter;
