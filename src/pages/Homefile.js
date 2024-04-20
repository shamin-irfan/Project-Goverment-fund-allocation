import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Redirect to public page after login
    navigate('/public-page');
  };

  return (
    <div className="home-container">
      <div className="content">
        <h1>Welcome to FundAlloc</h1>
        <p style={{color:'white'}}>FundAlloc utilizes blockchain technology to securely allocate and track government funds. By leveraging the transparency and immutability of blockchain, we ensure that fund allocations are transparent, auditable, and tamper-proof.</p>
        <p style={{color:'white'}}>On our platform, government officials can view detailed transaction information, including transaction hashes, block numbers, allocation amounts, purposes, and company names. Additionally, they have access to additional features such as editing allocations and managing government officials.</p>
        <p style={{color:'white'}}>We are committed to promoting accountability and transparency in government fund management through innovative blockchain solutions.</p>
      </div>
      <div className="login-button">
        <button onClick={handleLogin}>Login to Access Public Page</button>
      </div>
      <div className="services">
        <div className="service-card">
          <h2>Transparency</h2>
          <p>Our platform ensures transparent allocation and tracking of government funds through blockchain technology.</p>
        </div>
        <div className="service-card">
          <h2>Security</h2>
          <p>Blockchain technology provides enhanced security, ensuring that fund allocations are tamper-proof and auditable.</p>
        </div>
        <div className="service-card">
          <h2>Accountability</h2>
          <p>We promote accountability in government fund management by providing detailed transaction information and audit trails.</p>
        </div>
      </div>

      {/* Inline styles for aesthetic enhancements */}
      <style jsx global>{`
        body {
          background: linear-gradient(135deg, #6fbbe2, #0a0a77);
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
        }
        .home-container {
          max-width: 800px;
          margin: auto;
          padding: 2rem;
          text-align: center;
        }
        .content p {
            font-size: 1.2rem;
            line-height: 1.5;
            margin-bottom: 1rem;
            color: black;
        }
        .content {
          margin-bottom: 2rem;
        }
        h1 {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: #fff;
        }
        p {
          font-size: 1.2rem;
          line-height: 1.5;
          margin-bottom: 1rem;
          color: black;
        }
        .login-button button {
          padding: 12px 24px;
          font-size: 1.2rem;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .login-button button:hover {
          background-color: #0056b3;
        }
        .services {
          display: flex;
          justify-content: space-between;
        }
        .service-card {
            
            margin: 1rem;
          flex: 0 0 30%;
          padding: 1.5rem;
          background-color: #f9f9d5;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s;
          font-color: black;
        }
        .service-card:hover {
          transform: translateY(-5px);
        }
        h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
          
        }
      `}</style>
    </div>
  );
};

export default HomePage;
