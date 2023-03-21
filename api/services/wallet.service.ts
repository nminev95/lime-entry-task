import WalletModel from "../models/wallet/WalletModel";
import { TransactionType } from "../types/index.types";

const getAll = () => WalletModel.find();

const getByAddress = (address: string) => WalletModel.findOne({ address });

const addTransaction = (address: string, transaction: TransactionType) => {
  const filter = { address };
  const update = {
    $push: { transactions: transaction._id },
    $inc: {
      balance:
        transaction.sender === address
          ? -transaction.amount
          : +transaction.amount,
    },
  };

  return WalletModel.findOneAndUpdate(filter, update, { new: true });
};

const WalletService = {
  getAll,
  getByAddress,
  addTransaction,
};

export default WalletService;
