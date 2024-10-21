import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DealsPage from './pages/DealsPage';
import ClientsPage from './pages/ClientsPage';
import PropertiesPage from './pages/PropertyPage';
import NavBar from './component/NavBar';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SimularCreditPage from './pages/SimularCredit';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/imoveis" element={<PropertiesPage />} />
        <Route path="/financiamentos" element={<DealsPage />} />
        <Route path="/simular-credito" element={<SimularCreditPage />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    

    </Router>
  );
}

export default App;
