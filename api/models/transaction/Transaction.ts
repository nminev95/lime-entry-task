import mongoose, { Types } from "mongoose";
import { TransactionConstructor } from "../../types/index.types";

class Transaction {
  private _id: Types.ObjectId;
  private _sender: string;
  private _receiver: string;
  private _amount: number;

  constructor({ sender, receiver, amount }: TransactionConstructor) {
    this._id = new mongoose.Types.ObjectId();
    this._sender = sender;
    this._receiver = receiver;
    this._amount = amount;
  }

  getObjectId() {
    return this._id;
  }

  getSender() {
    return this._sender;
  }

  getReceiver() {
    return this._receiver;
  }

  getAmount() {
    return this._amount;
  }
}

export default Transaction;
