import express from "express";

import WalletService from "../services/wallet.service";

const walletRouter = express.Router();

walletRouter.get("/all", async (_, res) => {
  try {
    const wallets = await WalletService.getAll();
    res.send(wallets).status(200);
  } catch (error) {
    throw new Error(`Error: Could not get wallets: ${error}`);
  }
});

walletRouter.get("/:address", async (req, res) => {
  const { address } = req.params;
  try {
    const wallet = await WalletService.getByAddress(address);
    res.send(wallet);
  } catch (error) {
    throw new Error(
      `Error: Could not get wallets with address ${address} : ${error}`
    );
  }
});

export default walletRouter;
