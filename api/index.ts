import express from "express";
import dotenv from "dotenv";

import Utils from "./helpers/utils";
import initDatabase from "./db/mongo";
import walletRouter from "./routes/wallet";
import Network from "./models/network/Network";
import transactionRouter from "./routes/transaction";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

app.use("/wallets", walletRouter);
app.use("/transactions", transactionRouter);

const start = async () => {
  try {
    await initDatabase();

    // create network
    const networkInstance = new Network();

    // create three wallets, one with 100 ETH, one with 50 ETH and one with 0 ETH
    const walletInstance1 = await networkInstance.createWallet(100);
    const walletInstance2 = await networkInstance.createWallet(100);
    const walletInstance3 = await networkInstance.createWallet(100);

    // create 5 transactions
    // wallet 1 - 85, wallet 2 - 115, wallet 3 - 100
    const firstTransactionInstance = walletInstance1.signTransaction({
      receiver: walletInstance2.getAddress(),
      amount: 15,
    });
    await networkInstance.processTransaction(
      Utils.extractTransactionData(firstTransactionInstance)
    );
    // wallet 1 - 85, wallet 2 - 75, wallet 3 - 140
    const secondTransactionInstance = walletInstance2.signTransaction({
      receiver: walletInstance3.getAddress(),
      amount: 40,
    });
    await networkInstance.processTransaction(
      Utils.extractTransactionData(secondTransactionInstance)
    );
    // wallet 1 - 115, wallet 2 - 75, wallet 3 - 110
    const thirdTransactionInstance = walletInstance3.signTransaction({
      receiver: walletInstance1.getAddress(),
      amount: 30,
    });
    await networkInstance.processTransaction(
      Utils.extractTransactionData(thirdTransactionInstance)
    );
    // wallet 1 - 65, wallet 2 - 125, wallet 3 - 110
    const fourthTransactionInstance = walletInstance1.signTransaction({
      receiver: walletInstance2.getAddress(),
      amount: 50,
    });
    await networkInstance.processTransaction(
      Utils.extractTransactionData(fourthTransactionInstance)
    );
    // wallet 1 - 90, wallet 2 - 125, wallet 3 - 85
    const fifthTransactionInstance = walletInstance3.signTransaction({
      receiver: walletInstance1.getAddress(),
      amount: 25,
    });
    networkInstance.processTransaction(
      Utils.extractTransactionData(fifthTransactionInstance)
    );

    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
