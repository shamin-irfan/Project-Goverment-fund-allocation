import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Assuming you're using something like FontAwesome for icons
// import { FaHome, FaList, FaPlus, FaMinus, FaEdit } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button onClick={toggleSidebar} className="burger-btn">
        {isOpen ? '✖' : '☰'} {/* Using Unicode symbols for simplicity */}
      </button>

      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <Link className="link" to="/" onClick={toggleSidebar} style={{marginTop:"40px"}}>
          {/* <FaHome className="icon" /> */}
          Home
        </Link>
        <Link className="link" to="/public-page" onClick={toggleSidebar}>
          {/* <FaHome className="icon" /> */}
          Public Page
        </Link>
        <Link className="link" to="/allocated" onClick={toggleSidebar}>
          {/* <FaList className="icon" /> */}
          Current Allocations
        </Link>
        <Link className="link" to="/allocate" onClick={toggleSidebar}>
          {/* <FaPlus className="icon" /> */}
          Allocate Funds
        </Link>
        <Link className="link" to="/deallocate" onClick={toggleSidebar}>
          {/* <FaMinus className="icon" /> */}
          Deallocate Funds
        </Link>
        <Link className="link" to="/edit" onClick={toggleSidebar}>
          {/* <FaEdit className="icon" /> */}
          Edit Allocation
        </Link>
        <Link className="link" to="/set-government-employee" onClick={toggleSidebar}>
          {/* <FaEdit className="icon" /> */}
          Set Government Employee
        </Link>
        <Link className="link" to="/remove-government-official" onClick={toggleSidebar}>
          {/* <FaEdit className="icon" /> */}
          Remove Government Official
        </Link>
      </div>

      <div className={`main-content ${isOpen ? 'shifted' : ''}`}>
        {/* Your main content here */}
      </div>

      <style jsx>{`
        .burger-btn {
          position: fixed;
          top: 1rem;
          left: 1rem;
          z-index: 50;
          cursor: pointer;
          font-size: 24px;
          background: none;
          border: none;
          color: blue; /* Changed to white for contrast */
        }
        .sidebar {
          height: 100%;
          background-color: #007bff; /* Darker shade for elegance */
          overflow-x: hidden;
          transition: width 0.5s ease-in-out; /* Smooth transition */
          width: 0;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 10;
          box-shadow: 4px 0 5px -2px rgba(0,0,0,0.5); /* Adding shadow for depth */
        }
        .open {
          width: 250px;
        }
        .sidebar a {
          margin: 10px 0;
          padding: 10px 15px;
          text-decoration: none;
          font-size: 20px;
          color: #ddd; /* Lighter text color for readability */
          display: flex;
          align-items: center;
          transition: color 0.3s;
        }
        .sidebar a:hover {
          color: #fff; /* Bright color on hover for interactivity */
          background: rgba(255,255,255,0.1); /* Subtle hover background */
        }
        .icon {
          margin-right: 10px; /* Space between icon and text */
        }
        .closed {
          visibility: hidden;
          opacity: 0;
        }
        .main-content {
          
          transition: margin-left 0.5s ease-in-out; /* Smooth transition for content */
          padding: 16px;
        }
        .shifted {
          margin-left: 250px;
        }
      `}</style>
    </>
  );
};

export default Sidebar;
