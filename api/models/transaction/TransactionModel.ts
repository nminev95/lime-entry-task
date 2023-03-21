import { Schema, model } from "mongoose";

const TransactionSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Wallet",
  },
  receiver: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Wallet",
  },
  amount: {
    type: Schema.Types.Number,
    required: true,
  },
});

const TransactionModel = model("Transaction", TransactionSchema);

export default TransactionModel;
