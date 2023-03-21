import mongoose, { Types } from "mongoose";

import {
  TransactionType,
  SignTransactionParams,
} from "../../types/index.types";
import Utils from "../../helpers/utils";
import Transaction from "../transaction/Transaction";

class Wallet {
  private _id: Types.ObjectId;
  private _address: string;
  private _balance: number;
  private _transactions: TransactionType[];

  constructor(balance: number) {
    this._id = new mongoose.Types.ObjectId();
    this._address = Utils.generateRandomWalletAddress();
    this._balance = balance;
    this._transactions = [];
  }

  getBalance() {
    return this._balance;
  }

  setBalance(balance: number) {
    this._balance = balance;
  }

  getAddress() {
    return this._address;
  }

  getTransactions() {
    return this._transactions;
  }

  getObjectId() {
    return this._id;
  }

  pushTransaction(transaction: TransactionType) {
    this._transactions.push(transaction);
  }

  signTransaction({ receiver, amount }: SignTransactionParams) {
    if (this.getBalance() < amount) {
      console.error("Error: Not enough balance.");
    }

    if (this.getAddress() === receiver) {
      console.error("Error: You cannot send ETH to yourself.");
    }

    if (!Utils.isValidInteger(amount)) {
      console.error("Error: ETH amount should be a valid positive integer.");
    }

    const transaction = new Transaction({
      sender: this.getAddress(),
      receiver,
      amount,
    });
    return transaction;
  }
}

export default Wallet;
