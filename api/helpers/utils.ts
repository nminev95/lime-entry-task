import * as secp from "ethereum-cryptography/secp256k1.js";
import { toHex } from "ethereum-cryptography/utils.js";
import { keccak256 } from "ethereum-cryptography/keccak.js";

import Wallet from "../models/wallet/Wallet";
import { CalculateFeeParams } from "../types/index.types";
import Transaction from "../models/transaction/Transaction";

const generateRandomWalletAddress = () => {
  const privateKey = secp.utils.randomPrivateKey();
  const publicKey = secp.getPublicKey(privateKey);
  const hash = keccak256(publicKey.slice(1));
  const address = hash.slice(hash.length - 20, hash.length);
  return `0x${toHex(address)}`;
};

const calculateFee = ({ amount, percent }: CalculateFeeParams) => {
  return (percent * amount) / 100;
};

const extractTransactionData = (transaction: Transaction) => {
  return {
    _id: transaction.getObjectId(),
    sender: transaction.getSender(),
    receiver: transaction.getReceiver(),
    amount: transaction.getAmount(),
  };
};

const extractWalletData = (wallet: Wallet) => {
  return {
    _id: wallet.getObjectId(),
    address: wallet.getAddress(),
    balance: wallet.getBalance(),
    transactions: wallet.getTransactions(),
  };
};

const isValidInteger = (input: any) => {
  return input || input > 0 || !isNaN(input);
};

const Utils = {
  generateRandomWalletAddress,
  calculateFee,
  extractTransactionData,
  extractWalletData,
  isValidInteger,
};

export default Utils;
