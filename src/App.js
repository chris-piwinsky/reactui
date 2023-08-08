// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import UserDetails from './components/UserDetails'; // Import UserDetails component
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import './styles.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/:id" element={<UserDetails />} /> {/* Add route for UserDetails */}
            {/* Add routes for other pages (About, Contact, etc.) */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

