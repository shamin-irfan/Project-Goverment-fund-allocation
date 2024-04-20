import React, { useState } from 'react';
import Web3 from 'web3';
import contractABI from './abi.json'; // Adjust the path as necessary

const contractAddress = "0x641995bc6A3Dd6BB82B633eBeC5792dAA4cB87F4";

const Allocation = () => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState('');
  const [companyName, setCompanyName] = useState('');

  const handleAllocateFunds = async (e) => {
    e.preventDefault();

    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const accounts = await web3.eth.getAccounts();
        
        const amountInWei = web3.utils.toWei(amount, 'ether');
        await contract.methods.allocateFunds(recipient, amountInWei, purpose, companyName).send({ from: accounts[0] });

        alert('Funds allocated successfully!');
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to allocate funds');
      }
    } else {
      alert('Ethereum wallet is not connected');
    }
  };

  return (
    <div className="allocation-form-container">
      <h1>Allocate Funds</h1>
      <form onSubmit={handleAllocateFunds} className="input-group">
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="input"
          placeholder="Recipient Address"
          required
        />
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input"
          placeholder="Amount (ETH)"
          required
        />
        <input
          type="text"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          className="input"
          placeholder="Purpose"
          required
        />
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="input"
          placeholder="Company Name"
          required
        />
        <input type="submit" value="Allocate Funds" className="button" />
      </form>

      {/* Inline styles for aesthetic enhancements */}
      <style jsx>{`
        .allocation-form-container {
          max-width: 500px;
          margin: auto;
          padding: 2rem;
          background-color: #f7f7f7;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        h1 {
          color: #004085;
          margin-bottom: 20px;
          font-size: 32px;
          font-weight: bold;
        }
        .input-group {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        input, .button {
          width: 100%;
          padding: 12px;
          margin-bottom: 10px;
          border-radius: 20px;
          border: 1px solid #ddd;
          transition: all 0.3s;
        }
        input:focus {
          border-color: #007bff;
          box-shadow: 0 0 8px rgba(0,123,255,.2);
        }
        .button {
          background-color: #007bff;
          color: white;
          border: none;
          cursor: pointer;
          font-weight: 500;
          transition: background-color 0.3s;
        }
        .button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default Allocation;
