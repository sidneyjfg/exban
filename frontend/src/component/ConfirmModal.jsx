import Modal from 'react-modal';
import './style/ConfirmModal.css'; // Estilize seu modal conforme necessário

function ConfirmModal({ isOpen, onRequestClose, onConfirm, message }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Confirmação"
            className="confirm-modal-content" // Mudança aqui para corresponder ao seu CSS
            overlayClassName="confirm-modal-overlay" // Mudança aqui para corresponder ao seu CSS
        >
            <h2>{message}</h2>
            <div className="confirm-button-container">
                <button onClick={onConfirm} className="confirm-button">Confirmar</button>
                <button onClick={onRequestClose} className="cancel-button">Cancelar</button>
            </div>
        </Modal>
    );
}


export default ConfirmModal;
