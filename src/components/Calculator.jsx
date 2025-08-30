import React, { useState } from "react";
import { addFunction, subFunction, mulFunction, divFunction } from "../functions";

export default function Calculator({ account, contractInstance }) {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [result, setResult] = useState(0);

  async function calculateRes(operationType) {
    let operResult = 0;
    switch (operationType) {
      case "+":
        operResult = await addFunction(contractInstance, account, num1, num2);
        break;
      case "-":
        operResult = await subFunction(contractInstance, account, num1, num2);
        break;
      case "*":
        operResult = await mulFunction(contractInstance, account, num1, num2);
        break;
      case "/":
        operResult = await divFunction(contractInstance, account, num1, num2);
        break;
    }
    setResult(operResult);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">WEB3 Calculator</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Number 1:</label>
            <input
              type="number"
              className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
              placeholder="Enter First Number"
              onChange={(e) => setNum1(Number(e.target.value))}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Number 2:</label>
            <input
              type="number"
              className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
              placeholder="Enter Second Number"
              onChange={(e) => setNum2(Number(e.target.value))}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Result:</label>
            <input
              type="text"
              readOnly
              value={result}
              className="w-full h-12 border border-gray-300 rounded-lg px-4 bg-gray-100 text-gray-800 font-semibold"
            />
          </div>
        </div>

        <div className="flex justify-between mt-6 space-x-2">
          {["+", "-", "*", "/"].map((op) => (
            <button
              key={op}
              onClick={() => calculateRes(op)}
              className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-lg shadow-md transition transform hover:scale-105"
            >
              {op}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
