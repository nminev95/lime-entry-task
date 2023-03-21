# Wallet Project - LimeAcademy Entry Task

This project is a simulation of a crypto wallet on a certain network. The network can create wallets, wallets can sign transactions, the network can process them and store the wallets and transactions in a noSQL database. Basic REST endpoints are available for testing the updates.

## Libraries used

1. Express
2. MongoDB & Mongoose
3. TypeScript
4. Ethereum-cryptography
5. Nodemon

## Installation

1. Clone the repository: `git clone https://github.com/nminev95/wallet-limeacademy-entry-task.git`
2. Install Node.js (if not already installed).
3. Install project dependencies: `npm install`
4. Create a `.env` file in the root project directory and add the following contents inside:

`SERVER_PORT="3000"
MONGO_USER="wallet_admin"
MONGO_PASSWORD="aEAYVS1nN6avzyHn"`

## Usage

1. Run the project: `npm run dev`
2. Observe the `start` function in the `index.ts` file. You can see there are some transactions left to happen on server start. Five transactions will be executed.
3. You can see logs of the transactions process/errors in the terminal.
4. You can add more transactions and follow the state of the Network change. The database will be cleared on each express server run.
5. There are also endpoints available to query data from the database:

`/wallets/all - get all wallets from database`

`/wallets/:address - get a wallet from the database by address`

`/transactions/all - get all transactions from database`
