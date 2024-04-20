import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Allocation from './pages/Allocation';
import Deallocation from './pages/Deallocation';
import EditAllocation from './pages/EditAllocation';
import Allocated from './pages/Allocated';
import HomePage from './pages/Home';
import SetGovernmentEmployeePage from './pages/SetGovernmentEmployeePage';
import RemoveGovernmentOfficialPage from './pages/RemoveGovernmentOfficialPage';
import Homefile from './pages/Homefile';

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <Routes>
        <Route path="/" element={<Homefile />} />
          <Route path="/public-page" element={<HomePage />} />
          <Route path="/allocate" element={<Allocation />} />
          <Route path="/deallocate" element={<Deallocation />} />
          <Route path="/edit" element={<EditAllocation />} />
          <Route path="/allocated" element={<Allocated />} />
          <Route path="/set-government-employee" element={<SetGovernmentEmployeePage />} />
          <Route path="/remove-government-official" element={<RemoveGovernmentOfficialPage />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
