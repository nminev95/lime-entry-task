import { ObjectId } from "mongodb";

export interface TransactionConstructor {
  sender: string;
  receiver: string;
  amount: number;
}

export interface TransactionType extends TransactionConstructor {
  _id: ObjectId;
}

export type Wallet = {
  _id: ObjectId;
  address: string;
  balance: number;
  transactions: TransactionType[];
};

export type SignTransactionParams = {
  receiver: string;
  amount: number;
};

export type CalculateFeeParams = {
  amount: number;
  percent: number;
};
