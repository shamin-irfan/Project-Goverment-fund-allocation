import React, { useState } from 'react';
import Web3 from 'web3';
import contractABI from './abi.json'; // Adjust the path as necessary

const contractAddress = "0x641995bc6A3Dd6BB82B633eBeC5792dAA4cB87F4";

const EditAllocation = () => {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newPurpose, setNewPurpose] = useState('');
  const [newCompanyName, setNewCompanyName] = useState('');

  const handleEditAllocation = async (e) => {
    e.preventDefault();

    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const accounts = await web3.eth.getAccounts();
        
        const amountInWei = web3.utils.toWei(newAmount, 'ether');
        
        // Assuming the smart contract has a function `editAllocation` that accepts amount, purpose, and company name
        await contract.methods.editAllocation(recipientAddress, amountInWei, newPurpose, newCompanyName).send({ from: accounts[0] });

        alert('Allocation edited successfully!');
      } catch (error) {
        console.error('Error editing allocation:', error);
        alert('Failed to edit allocation');
      }
    } else {
      alert('Ethereum wallet is not connected');
    }
  };

  return (
    <div className="edit-allocation-container">
      <h1>Edit Allocation</h1>
      <form onSubmit={handleEditAllocation} className="form-group">
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
        <div className="input-container">
          <label>New Amount (ETH)</label>
          <input
            type="text"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
            className="input"
            placeholder="Enter new amount in ETH"
            required
          />
        </div>
        <div className="input-container">
          <label>New Purpose</label>
          <input
            type="text"
            value={newPurpose}
            onChange={(e) => setNewPurpose(e.target.value)}
            className="input"
            placeholder="Enter new purpose"
            required
          />
        </div>
        <div className="input-container">
          <label>New Company Name</label>
          <input
            type="text"
            value={newCompanyName}
            onChange={(e) => setNewCompanyName(e.target.value)}
            className="input"
            placeholder="Enter new company name"
            required
          />
        </div>
        <input type="submit" value="Edit Allocation" className="button" />
      </form>

      {/* Inline styles for aesthetic enhancements */}
      <style jsx>{`
        .edit-allocation-container {
          max-width: 500px;
          margin: auto;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          text-align: center;
          margin-top: 50px;
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
          display:block;
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

export default EditAllocation;
