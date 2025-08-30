import Web3 from "web3";
import CalculatorContract from './calculator.json';

// Connect to local Ganache or any provider
export async function connectWeb3() {
  try {
    const provider = new Web3.providers.HttpProvider("http://localhost:8545");
    const web3 = new Web3(provider);

    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = CalculatorContract.networks[networkId];

    if (!deployedNetwork) {
      throw new Error("Contract not deployed on the detected network");
    }

    const instance = new web3.eth.Contract(
      CalculatorContract.abi,
      deployedNetwork.address
    );

    return { accounts, instance };
  } catch (err) {
    console.error("Failed to connect Web3:", err);
    return null;
  }
}

// Add two numbers via smart contract
export async function addFunction(contractInstance, account, num1, num2) {
  const res = await contractInstance.methods
    .addNum(Number(num1), Number(num2))
    .send({from : account}); // use call instead of send
    console.log(res);
  return res; // returns the number directly
}


// Subtract (always larger - smaller)
export async function subFunction(contractInstance, account, num1, num2) {
  const [a, b] = Number(num1) >= Number(num2) ? [num1, num2] : [num2, num1];
  const res = await contractInstance.methods.subNum(a, b).send({ from: account });
  console.log(res);
  return res.events.Result.returnValues.value;
}

// Multiply two numbers
export async function mulFunction(contractInstance, account, num1, num2) {
  const res = await contractInstance.methods
    .mulNum(Number(num1), Number(num2))
    .send({ from: account });
    console.log(res);
  return res.events.Result.returnValues.value;
}

// Divide two numbers
export async function divFunction(contractInstance, account, num1, num2) {
  if (Number(num2) === 0) throw new Error("Division by zero!");
  const res = await contractInstance.methods
    .divNum(Number(num1), Number(num2))
    .send({ from: account });
    console.log(res);
  return res.events.Result.returnValues.value;
}
