import React, { useEffect, useState } from "react";
import Calculator from "./components/Calculator";
import { connectWeb3 } from "./functions"; // make sure this points to your web3 helper

function App() {
  const [contractInstance, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    async function connect() {
      try {
        const { accounts, instance } = await connectWeb3();
        setAccounts(accounts);
        setContract(instance);
      } catch (error) {
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
    }
    connect();
  }, []);

  return (
    <div id="App" className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        {contractInstance === null ? (
          <h2 className="text-center text-xl font-semibold text-gray-700">
            Trying to connect with Web3 provider...
          </h2>
        ) : (
          <Calculator contractInstance={contractInstance} account={accounts[0]} />
        )}
      </div>
    </div>
  );
}

export default App;
