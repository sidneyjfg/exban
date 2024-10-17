import React from 'react';
import ClientForm from './component/ClientForm';
import './App.css'; // Certifique-se de importar o CSS adequado
import ClientsPage from './pages/Clients';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <div className="App">
            <nav>
                <h1>Lista de Clientes</h1>
            </nav>
            <ToastContainer />
            <ClientsPage />
            <ClientForm />
        </div>
    );
}

export default App;
