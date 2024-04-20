import React, { useState } from 'react';
import Web3 from 'web3';
import contractABI from './abi.json'; // Ensure this path is correct

const contractAddress = "0x641995bc6A3Dd6BB82B633eBeC5792dAA4cB87F4";

const DeallocateFunds = () => {
  const [recipientAddress, setRecipientAddress] = useState('');

  const handleDeallocateFunds = async (e) => {
    e.preventDefault();

    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const accounts = await web3.eth.getAccounts();
        
        await contract.methods.deallocateFunds(recipientAddress).send({ from: accounts[0] });

        alert('Funds deallocated successfully!');
      } catch (error) {
        console.error('Error deallocating funds:', error);
        alert('Failed to deallocate funds');
      }
    } else {
      alert('Ethereum wallet is not connected');
    }
  };

  return (
    <div className="deallocate-funds-container">
      <h1>Deallocate Funds</h1>
      <form onSubmit={handleDeallocateFunds} className="form-group">
        <div className="input-container">
          <label>Recipient Address</label>
          <input
            type="text"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            className="input"
            placeholder="Enter recipient address"
            required
          />
        </div>
        <input type="submit" value="Deallocate Funds" className="button" />
      </form>

      {/* Inline styles for aesthetic enhancements */}
      <style jsx>{`
        .deallocate-funds-container {
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
        .form-group {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .input-container {
          width: 100%;
          margin-bottom: 1rem;
        }
        label {
          display: block;
          margin-bottom: .5rem;
          color: #666;
        }
        .input {
          width: 100%;
          padding: 12px;
          margin-bottom: 10px;
          border-radius: 20px;
          border: 1px solid #ddd;
          transition: all 0.3s;
        }
        .input:focus {
          border-color: #007bff;
          box-shadow: 0 0 8px rgba(0,123,255,.2);
        }
        .button {
          width: 100%;
          padding: 12px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 20px;
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

export default DeallocateFunds;
