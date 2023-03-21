import TransactionModel from "../models/transaction/TransactionModel";

const getAll = () => TransactionModel.find();

const TransactionService = {
  getAll,
};

export default TransactionService;
