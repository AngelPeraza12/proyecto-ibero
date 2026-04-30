import React from 'react';

const DocenteForm = ({ formData, setFormData, onSubmit, editIndex }) => {
  
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    // Mantenemos la transformación a MAYÚSCULAS en el estado interno
    // para que el usuario vea lo que se guardará, o puedes quitar el .toUpperCase()
    // aquí si prefieres que vea minúsculas mientras escribe.
    const finalValue = (type === 'text' || name === 'titulo') ? value.toUpperCase() : value;
    setFormData({ ...formData, [name]: finalValue });
  };

  const handleTelefonoChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData({ ...formData, telefono: val });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-container">
        {/* Usamos Placeholders en estilo Nombre Propio */}
        <input name="nombre" type="text" placeholder="Nombre completo" value={formData.nombre} onChange={handleChange} required maxLength="100" />
        
        <input name="correo" type="email" placeholder="Correo electrónico" value={formData.correo} onChange={handleChange} required maxLength="100" />
        
        <input name="telefono" type="tel" placeholder="Teléfono (10 dígitos)" value={formData.telefono} onChange={handleTelefonoChange} />
        
        <input name="titulo" type="text" placeholder="Título profesional" value={formData.titulo} onChange={handleChange} required maxLength="100" />
        
        <select name="areaAcademica" value={formData.areaAcademica} onChange={handleChange} required>
          <option value="" disabled>Seleccione área académica</option>
          <option value="ADMINISTRACIÓN Y NEGOCIOS">Administración y Negocios</option>
          <option value="ARTES Y HUMANIDADES">Artes y Humanidades</option>
          <option value="CIENCIAS BIOLÓGICAS Y SALUD">Ciencias Biológicas y Salud</option>
          <option value="CIENCIAS EXACTAS Y NATURALES">Ciencias Exactas y Naturales</option>
          <option value="CIENCIAS SOCIALES">Ciencias Sociales</option>
          <option value="CONTADURÍA Y FINANZAS">Contaduría y Finanzas</option>
          <option value="DERECHO Y LEYES">Derecho y Leyes</option>
          <option value="EDUCACIÓN Y PEDAGOGÍA">Educación y Pedagogía</option>
          <option value="INGENIERÍA Y TECNOLOGÍA">Ingeniería y Tecnología</option>
          <option value="PSICOLOGÍA Y BIENESTAR">Psicología y Bienestar</option>
        </select>

        <select name="dedicacion" value={formData.dedicacion} onChange={handleChange} required>
          <option value="" disabled>Seleccione dedicación</option>
          <option value="TIEMPO COMPLETO">Tiempo completo</option>
          <option value="MEDIO TIEMPO">Medio tiempo</option>
          <option value="CÁTEDRA">Cátedra</option>
          <option value="INVESTIGADOR">Investigador</option>
          <option value="HONORARIOS">Honorarios</option>
        </select>

        <input name="aniosExperiencia" type="number" placeholder="Años de experiencia" value={formData.aniosExperiencia === 0 ? '' : formData.aniosExperiencia} onChange={handleChange} />
        
        <button type="submit" className="btn-guardar">
          {editIndex !== null ? 'Actualizar docente' : 'Guardar docente'}
        </button>
      </div>
    </form>
  );
};

export default DocenteForm;