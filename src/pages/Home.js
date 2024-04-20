import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import contractABI from './abi.json'; // Adjust the path as necessary

const contractAddress = "0x641995bc6A3Dd6BB82B633eBeC5792dAA4cB87F4";
const apiUrl = `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${contractAddress}&startblock=0&endblock=99999999&sort=asc&apikey=Z9W1T56PF9BX8B3RKHU2NXXUEJ6GWFKB7X`;

const HomePage = () => {
  const [transactions, setTransactions] = useState([]);
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.status !== "1") {
          throw new Error('Error fetching data from Sepolia API');
        }
        setTransactions(data.result.slice(1)); // Skip the first transaction
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    const fetchAllocations = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const web3 = new Web3(window.ethereum);
          const contract = new web3.eth.Contract(contractABI, contractAddress);
          const data = await contract.methods.getAllAllocations().call();
          const formattedAllocations = data[0].map((amount, index) => ({
            amount: web3.utils.fromWei(amount, 'ether'),
            purpose: data[1][index],
            companyName: data[2][index]
          }));
          setAllocations(formattedAllocations);
        } catch (error) {
          console.error('Error fetching allocations:', error);
          setError(error.message);
        }
      }
    };

    fetchTransactions();
    fetchAllocations();
  }, []);

  return (
    <div className="container">
      <h1>Transactions for Contract:</h1>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Transaction Hash</th>
              <th>Block</th>
              <th>Age</th>
              <th>Company Name</th>
              <th>Amount (ETH)</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => {
              const allocation = allocations[index] || {};
              return (
                <tr key={tx.hash}>
                  <td>{tx.hash}</td>
                  <td>{tx.blockNumber}</td>
                  <td>{new Date(tx.timeStamp * 1000).toLocaleString()}</td>
                  <td>{allocation.companyName || 'Deallocated Transaction'}</td>
                  <td>{allocation.amount ? `${allocation.amount} ETH` : 'Deallocated Transaction'}</td>
                  <td>{allocation.purpose || 'Deallocated Transaction'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Enhanced Styling */}
      <style jsx>{`
        .container {
          max-width: 100%;
          margin: auto;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          text-align: center;
        }
        h1 {
          color: #004085;
          margin-bottom: 20px;
          font-size: 32px;
          font-weight: bold;
        }
        .error {
          color: #ff3860;
        }
        table {
          margin-top: 20px;
          width: 98%;
          border-collapse: collapse;
          border-spacing: 0;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
          background: #fdfdfd;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #ddd;
        }
        th, td {
          text-align: left;
          padding: 15px;
          border-bottom: 1px solid #ddd;
        }
        th {
          background-color: #007bff; /* Adds vertical borders between headers */
        }
        td {
          border-right: 1px solid #ddd; /* Adds vertical borders between cells */
        }
        tbody tr:nth-child(odd) {
          background-color: #f8f9fa;
        }
        tbody tr:hover {
          background-color: #eff2f7;
        }
        @keyframes fadeInAnimation {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
