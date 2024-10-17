import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './style/Modal.css';

function ClientForm({ isOpen, setIsOpen, addClient }) {
    const [newClient, setNewClient] = useState({ name: '', fiscalIdentifier: '', email: '' });

    const isValidCPF = (cpf) => {
        return cpf.length === 11;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValidCPF(newClient.fiscalIdentifier)) {
            toast.error("CPF deve ter 11 dígitos.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }
        try {
            await axios.post('http://localhost:9000/clients', newClient);
            setNewClient({ name: '', fiscalIdentifier: '', email: '' }); // Limpar formulário
            setIsOpen(false); // Fechar modal
            addClient(); // Atualizar lista de clientes
            toast.success("Cliente adicionado com sucesso!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            const errMsg = error.response?.data?.message || "Erro desconhecido ao adicionar cliente.";
            toast.error(errMsg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className={`modal ${isOpen ? 'active' : ''}`}>
            <div className="modal-content">
                <span className="close" onClick={() => setIsOpen(false)}>&times;</span>
                <h2>Adicionar Cliente</h2>
                <form onSubmit={handleSubmit}>
                    <label>Nome:</label>
                    <input type="text" value={newClient.name} onChange={(e) => setNewClient({ ...newClient, name: e.target.value })} required />
                    <label>CPF:</label>
                    <input type="text" value={newClient.fiscalIdentifier} onChange={(e) => setNewClient({ ...newClient, fiscalIdentifier: e.target.value })} required />
                    <label>Email:</label>
                    <input type="email" value={newClient.email} onChange={(e) => setNewClient({ ...newClient, email: e.target.value })} required />
                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}

export default ClientForm;
