import { Schema, model } from "mongoose";

const WalletSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  address: {
    type: Schema.Types.String,
    required: true,
  },
  balance: {
    type: Schema.Types.Number,
    required: true,
    default: 0,
  },
  transactions: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Transaction",
    },
  ],
});

const WalletModel = model("Wallet", WalletSchema);

export default WalletModel;
