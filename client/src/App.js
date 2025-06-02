import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import AddTransaction from './pages/AddTransaction';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
             <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/add-transaction" 
          element={
            <PrivateRoute>
              <AddTransaction />
            </PrivateRoute>
          }
        />
      </Routes>

  
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
