import React from 'react';
import { motion } from 'framer-motion'; // Para animações suaves
import './style/PropertyCard.css'; // Estilo do cartão de imóvel
import { formatCurrency } from '../utils/utils';

const PropertyCard = ({ property, onDelete, onEdit }) => {
  return (
    <motion.div
      className="property-card"
      whileHover={{ scale: 1.05 }} // Animação ao passar o mouse
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="property-info">
        <h3>{property.address}</h3>
        <p>Valor: {formatCurrency(property.value)}</p> {/* Formatação correta da moeda */}
        <button onClick={() => onEdit(property)}>Editar</button> {/* Botão de edição */}
        <button onClick={() => onDelete(property.id)}>Deletar</button> {/* Botão de exclusão */}
      </div>
    </motion.div>
  );
};

export default PropertyCard;
