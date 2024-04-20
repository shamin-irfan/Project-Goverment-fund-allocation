import React, { useState } from 'react';
import Web3 from 'web3';
import contractABI from './abi.json'; // Adjust the path as necessary

const contractAddress = "0x641995bc6A3Dd6BB82B633eBeC5792dAA4cB87F4"; // Update with your contract address

const RemoveGovernmentOfficialPage = () => {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRemoveGovernmentOfficial = async () => {
    setLoading(true);
    try {
      if (!window.ethereum) throw new Error('MetaMask is not installed');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(contractABI, contractAddress);
      const accounts = await web3.eth.getAccounts();
      await contract.methods.removeGovernmentOfficial(address).send({ from: accounts[0] });
      setAddress('');
      setLoading(false);
      alert('Government official removed successfully!');
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Remove Government Official</h1>
      <div>
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter address"
          className="input"
        />
      </div>
      <button onClick={handleRemoveGovernmentOfficial} disabled={loading} className="button">
        {loading ? 'Removing...' : 'Remove Government Official'}
      </button>
      {error && <p className="error">{error}</p>}
      <style jsx>{`
        .container {
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
        label {
          display: block;
          margin-bottom: .5rem;
          color: #666;
          font-size: 18px;
          font-weight: bold;
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
          background-color: #dc3545;
          color: white;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          font-weight: 500;
          transition: background-color 0.3s;
        }
        .button:hover {
          background-color: #c82333;
        }
        .error {
          color: #ff3860;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default RemoveGovernmentOfficialPage;
