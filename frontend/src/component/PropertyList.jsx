import React from 'react';
import PropertyCard from './PropertyCard'; // Componente para exibir os imóveis
import './style/PropertyList.css';

const PropertyList = ({ properties, onDelete, onEdit }) => { // Recebe propriedades, onDelete e onEdit como props
  return (
    <div className="property-list-page">
      <div className="property-list">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onDelete={onDelete} // Chama a função onDelete passada por PropertiesPage
            onEdit={onEdit} // Chama a função onEdit passada por PropertiesPage
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
