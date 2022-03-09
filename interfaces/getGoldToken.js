// #######################################################
// ####################  Setup  ##########################
// #######################################################

// Imports & setup for web3 and ContractKit

const Web3 = require("web3");
const ContractKit = require("@celo/contractkit");
const web3 = new Web3(`https://alfajores-forno.celo-testnet.org`);
const kit = ContractKit.newKitFromWeb3(web3);

// **---------- ✅ Set account variables--------------** //

// Update private key to the account you would like to use (do not share with others)
const PRIVATE_KEY =
  "0xc010dfbc3acd55b8e25113773b363c7abe8642a58d4e4c8b3a4d586b3eab8ce8";
const account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
// Update address to the address of the account you want to interact with
let address = "0x742f06f94B9F88fc263C433a19576D361a3E9D94";
// Set amount for transfer related functions
let value = ".01";

//  Connect to the network

kit.connection.addAccount(account.privateKey);
kit.defaultAccount = account.address;

// #######################################################
// ################## Read Functions  ####################
// #######################################################

// **--------------- ✅ Name ---------------** //

/**
 * @return The name of the CELO token.
 */

async function name() {
  let contract = await kit.contracts.getGoldToken();
  let name = await contract.name();
  console.log(`${name}`);
}

// name();

// **-------------- ✅ Symbol --------------** //

/**
 * @return The symbol of the CELO token.
 */

async function symbol() {
  let contract = await kit.contracts.getGoldToken();
  let symbol = await contract.symbol();
  console.log(`${symbol}`);
}

// symbol();

// **----------- ✅ Total Supply -----------** //

/**
 * @return The total amount of CELO in existence.
 */

async function totalSupply() {
  let contract = await kit.contracts.getGoldToken();
  let totalSupply = await contract.totalSupply();
  console.log(`${totalSupply}`);
}

// totalSupply();

// **------------- ✅ Decimals -------------** //

/**
 * @return The number of decimal places to which CELO is divisible.
 */

async function decimals() {
  let contract = await kit.contracts.getGoldToken();
  let decimals = await contract.decimals();
  console.log(`${decimals}`);
}

// decimals();

// #######################################################
// ################ Account Functions ####################
// #######################################################

// **----------------- ✅ Balance Of -----------------** //

/**
 * @notice Gets the balance of the specified address.
 * @param owner The address to query the balance of.
 * @return The balance of the specified address.
 */

async function balanceOf() {
  let contract = await kit.contracts.getGoldToken();
  let balanceOf = await contract.balanceOf(account.address);
  console.log(`${balanceOf}`);
}

// balanceOf();

// **----------------- ✅ Transfer -------------------** //

/**
 * @notice Transfers CELO from one address to another.
 * @param to The address to transfer CELO to.
 * @param value The amount of CELO to transfer.
 * @return True if the transaction succeeds.
 */

async function transfer() {
  let amount = kit.web3.utils.toWei(value, "ether");
  let contract = await kit.contracts.getGoldToken();
  let transaction = await contract
    .transfer(address, amount)
    .send({ from: account.address });
  let receipt = await transaction.waitReceipt();
  let balance = await contract.balanceOf(account.address);

  console.log(
    `Transaction: https://alfajores-blockscout.celo-testnet.org/tx/${receipt.transactionHash}/`,
    "\n",
    `Balance: ${kit.web3.utils.fromWei(balance.toString(), "ether")}`
  );
}

// transfer();

// **----------- ✅ Transfer with Comment ------------** //

/**
 * @notice Transfers CELO from one address to another with a comment.
 * @param to The address to transfer CELO to.
 * @param value The amount of CELO to transfer.
 * @param comment The transfer comment
 * @return True if the transaction succeeds.
 */

async function transferWithComment() {
  let amount = kit.web3.utils.toWei(value, "ether");
  let contract = await kit.contracts.getGoldToken();
  let transaction = await contract
    .transferWithComment(address, amount, comment)
    .send({ from: account.address });
  let receipt = await transaction.waitReceipt();
  let balance = await contract.balanceOf(account.address);

  console.log(
    `Transaction: https://alfajores-blockscout.celo-testnet.org/tx/${receipt.transactionHash}/`,
    "\n",
    `Balance: ${kit.web3.utils.fromWei(balance.toString(), "ether")}`
  );
}

// transferWithComment();