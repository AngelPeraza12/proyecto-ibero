import React from 'react';

const DocenteTable = ({ registros, onEdit, onDelete }) => {
  return (
    <table className="table-docentes">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Teléfono</th>
          <th>Título</th>
          <th>Área Académica</th>
          <th>Dedicación</th>
          <th>Años Exp.</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {registros.map((doc, index) => (
          <tr key={doc.id || index}>
            <td>{doc.nombre}</td>
            <td>{doc.correo}</td>
            <td>{doc.telefono}</td>
            <td>{doc.titulo}</td>
            <td>{doc.area_academica}</td>
            <td>{doc.dedicacion}</td>
            <td>{doc.anios_experiencia}</td>
            <td>
              <button className="btn-editar" onClick={() => onEdit(index)}>Editar</button>
              <button className="btn-eliminar" onClick={() => onDelete(index)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DocenteTable;