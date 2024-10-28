import React, { useState, useEffect } from 'react';
import clientService from '../services/clientService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style/ClientForm.css';

function ClientForm({ isOpen, setIsOpen, fetchClients, client }) {
    const [newClient, setNewClient] = useState({ name: '', fiscalIdentifier: '', email: '' });

    useEffect(() => {
        if (client) {
            setNewClient(client);
        }
    }, [client]);

    const formatCPF = (cpf) => {
        cpf = cpf.replace(/\D/g, ''); // Remove any character que não é número
        if (cpf.length <= 3) return cpf;
        if (cpf.length <= 6) return cpf.replace(/(\d{3})(\d+)/, '$1.$2');
        if (cpf.length <= 9) return cpf.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    };

    const handleCPFChange = (e) => {
        const formattedCpf = formatCPF(e.target.value);
        setNewClient({ ...newClient, fiscalIdentifier: formattedCpf });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Criar uma cópia de newClient com fiscalIdentifier sem formatação
        const clientData = {
            ...newClient,
            fiscalIdentifier: newClient.fiscalIdentifier.replace(/\D/g, '') // remove formatação
        };
    
        try {
            if (client) {
                // Atualizar cliente
                await clientService.updateClient(client.id, clientData);
                toast.success('Cliente atualizado com sucesso!');
            } else {
                // Adicionar cliente
                await clientService.addClient(clientData);
                toast.success('Cliente adicionado com sucesso!');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Erro ao processar cliente.');
        }
    
        await fetchClients(); // Atualiza a lista de clientes
        setIsOpen(false); // Fecha a modal imediatamente após o sucesso
    };    

    if (!isOpen) return null;

    return (
        <div className={`modal ${isOpen ? 'active' : ''}`}>
            <div className="modal-content">
                <span className="close" onClick={() => setIsOpen(false)}>&times;</span>
                <h2>{client ? 'Editar Cliente' : 'Adicionar Cliente'}</h2>
                <form onSubmit={handleSubmit}>
                    <label>Nome:</label>
                    <input
                        type="text"
                        value={newClient.name}
                        onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                        required
                    />
                    <label>CPF:</label>
                    <input
                        type="text"
                        value={newClient.fiscalIdentifier}
                        onChange={handleCPFChange}
                        placeholder="000.000.000-00"
                        required
                    />
                    <label>Email:</label>
                    <input
                        type="email"
                        value={newClient.email}
                        onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                        required
                    />
                    <button type="submit">{client ? 'Atualizar' : 'Cadastrar'}</button>
                </form>
            </div>
        </div>
    );
}

export default ClientForm;
