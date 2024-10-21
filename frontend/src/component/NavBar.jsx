// src/component/NavBar.jsx
import React from 'react';
import './style/NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/clients">Clientes</a></li>
        <li><a href="/imoveis">Imóveis</a></li>
        <li><a href="/financiamentos">Financiamentos</a></li>
        <li><a href="/simular-credito">Simular Crédito</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;
