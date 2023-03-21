import Wallet from "../wallet/Wallet";
import Utils from "../../helpers/utils";
import WalletModel from "../wallet/WalletModel";
import WalletService from "../../services/wallet.service";
import { TransactionType } from "../../types/index.types";
import TransactionModel from "../transaction/TransactionModel";

class Network {
  wallets: Map<string, Wallet>;
  transactions: TransactionType[];
  fees: number;

  constructor() {
    this.wallets = new Map();
    this.transactions = [];
    this.fees = 0;
  }

  async createWallet(initialBalance: number = 0) {
    if (!Utils.isValidInteger(initialBalance)) {
      console.error("Error: Initial balance must be a valid positive number.");
    }

    const newWallet = new Wallet(initialBalance);
    const walletData = Utils.extractWalletData(newWallet);
    const walletRecord = new WalletModel(walletData);

    try {
      await walletRecord.save();
      this.wallets.set(newWallet.getAddress(), newWallet);
      console.log(
        `Wallet record with _id: ${walletRecord._id} was added to database.`
      );
    } catch (error) {
      throw new Error(
        `Error: Couldn't add new wallet record with _id: ${walletRecord._id} to database: ${error}`
      );
    }

    return newWallet;
  }

  findWallet(address: string) {
    return this.wallets.get(address);
  }

  async processTransaction(transaction: TransactionType) {
    const { sender, receiver, amount } = transaction;
    const senderWallet = this.findWallet(sender);
    const receiverWallet = this.findWallet(receiver);

    if (!senderWallet || !receiverWallet) {
      console.error(
        `Error: Invalid wallet address for ${
          !senderWallet ? "sender" : "receiver"
        }.`
      );
      return;
    }

    const transactionRecord = new TransactionModel(transaction);

    try {
      transactionRecord.sender = senderWallet.getObjectId();
      transactionRecord.receiver = receiverWallet.getObjectId();
      await transactionRecord.save();
      console.info(
        `Transaction record with _id: ${transactionRecord._id} was added to database.`
      );
      // calculate fee
      const transactionFee = Utils.calculateFee({ amount, percent: 1 });
      // update balances
      const senderBalanceAfterTransaction = senderWallet.getBalance() - amount;
      const receiverBalanceAfterTransaction =
        receiverWallet.getBalance() + amount;
      senderWallet.setBalance(senderBalanceAfterTransaction);
      receiverWallet.setBalance(receiverBalanceAfterTransaction);
      // add transaction to both wallets
      senderWallet.pushTransaction(transaction);
      receiverWallet.pushTransaction(transaction);
      await WalletService.addTransaction(
        senderWallet.getAddress(),
        transaction
      );
      await WalletService.addTransaction(
        receiverWallet.getAddress(),
        transaction
      );

      this.fees += transactionFee;
      console.info(
        `Network has won ${transactionFee} ETH from this transaction. Current accumulated ETH: ${this.fees}`
      );
    } catch (error) {
      throw new Error(
        `Error: Couldn't add new transaction record with _id: ${transactionRecord._id} to database: ${error}`
      );
    }

    console.info(
      `Network has processed a transaction: ${JSON.stringify(transaction)}`
    );
  }
}

export default Network;
