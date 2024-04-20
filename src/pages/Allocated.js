import React, { useState } from 'react';
import Web3 from 'web3';
import contractABI from './abi.json'; // Ensure this path is correct

const contractAddress = "0x641995bc6A3Dd6BB82B633eBeC5792dAA4cB87F4";

const Allocated = () => {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [allocationDetails, setAllocationDetails] = useState({amount: '', purpose: '', companyName: ''});

  const fetchAllocation = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        const allocation = await contract.methods.allocations(recipientAddress).call();
        setAllocationDetails({
          amount: web3.utils.fromWei(allocation.amount, 'ether'),
          purpose: allocation.purpose,
          companyName: allocation.companyName
        });
      } catch (error) {
        console.error('Error fetching allocation:', error);
        alert('Failed to fetch allocation');
      }
    } else {
      alert('Ethereum wallet is not connected');
    }
  };

  return (
    <div className="allocation-page">
      <div className="content">
        <h1>Fetch Allocation</h1>
        <div className="input-group">
          <input
            type="text"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            placeholder="Recipient Address"
          />
          <button className='button' onClick={fetchAllocation}>Fetch Allocation</button>
        </div>
        {allocationDetails.amount && (
          <div className="allocation-details">
            <p><strong>Amount:</strong> {allocationDetails.amount} ETH</p>
            <p><strong>Purpose:</strong> {allocationDetails.purpose}</p>
            <p><strong>Company Name:</strong> {allocationDetails.companyName}</p>
          </div>
        )}
      </div>

      {/* Inline styles for simplicity - consider moving these to a CSS file */}
      <style jsx>{`
        .allocation-page {
          max-width: 500px;
          margin: auto;
          padding: 2rem;
          background-color: #f7f7f7;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        .content {
          margin: auto;
          padding: 2rem;
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
          border-radius: 20px; /* Rounded edges for a modern look */
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
        .allocation-details {
          margin-top: 20px;
          padding: 20px;
          background-color: white;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          border-radius: 20px; /* Consistent rounded edges */
        }
        .allocation-details p {
          margin: 10px 0;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
};

export default Allocated;
