import React from 'react';
import { formatSoloNumeros } from '../utils/validaciones';

const DocenteForm = ({ formData, setFormData, onSubmit, editIndex }) => {
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    let finalValue = value;

    // 1. Lógica para campos que SIEMPRE deben ser Mayúsculas (Nombre y Título)
    if (name === 'nombre' || name === 'titulo') {
      finalValue = value.toUpperCase();
    }

    // 2. Lógica para el correo (SIEMPRE minúsculas para evitar errores de login/envío)
    if (name === 'correo') {
      finalValue = value.toLowerCase();
    }

    // 3. Lógica para números (Teléfono y Años de Experiencia)
    if (name === 'telefono') {
      finalValue = formatSoloNumeros(value); // Usa tu función de utils
    }

    if (name === 'aniosExperiencia') {
      // Solo permite números y evita valores negativos o extremadamente largos
      finalValue = value.replace(/\D/g, '').slice(0, 2); 
    }

    setFormData({ ...formData, [name]: finalValue });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-container">
        {/* Nombre: Forzado a Mayúsculas por handleChange */}
        <input name="nombre" type="text" placeholder="NOMBRE COMPLETO" value={formData.nombre} onChange={handleChange} required maxLength="100" />
        
        {/* Correo: Forzado a Minúsculas */}
        <input name="correo" type="email" placeholder="correo@ejemplo.com" value={formData.correo} onChange={handleChange} required maxLength="100" />
        
        {/* Teléfono: Solo números y máx 10 */}
        <input name="telefono" type="tel" placeholder="TELÉFONO (10 DÍGITOS)" value={formData.telefono} onChange={handleChange} />
        
        {/* Título: Forzado a Mayúsculas */}
        <input name="titulo" type="text" placeholder="TÍTULO PROFESIONAL" value={formData.titulo} onChange={handleChange} required maxLength="100" />
        
        <select name="areaAcademica" value={formData.areaAcademica} onChange={handleChange} required>
          <option value="" disabled>SELECCIONE ÁREA ACADÉMICA</option>
          <option value="ADMINISTRACIÓN Y NEGOCIOS">ADMINISTRACIÓN Y NEGOCIOS</option>
          <option value="ARTES Y HUMANIDADES">ARTES Y HUMANIDADES</option>
          <option value="CIENCIAS BIOLÓGICAS Y SALUD">CIENCIAS BIOLÓGICAS Y SALUD</option>
          <option value="CIENCIAS EXACTAS Y NATURALES">CIENCIAS EXACTAS Y NATURALES</option>
          <option value="CIENCIAS SOCIALES">CIENCIAS SOCIALES</option>
          <option value="CONTADURÍA Y FINANZAS">CONTADURÍA Y FINANZAS</option>
          <option value="DERECHO Y LEYES">DERECHO Y LEYES</option>
          <option value="EDUCACIÓN Y PEDAGOGÍA">EDUCACIÓN Y PEDAGOGÍA</option>
          <option value="INGENIERÍA Y TECNOLOGÍA">INGENIERÍA Y TECNOLOGÍA</option>
          <option value="PSICOLOGÍA Y BIENESTAR">PSICOLOGÍA Y BIENESTAR</option>
        </select>

        <select name="dedicacion" value={formData.dedicacion} onChange={handleChange} required>
          <option value="" disabled>SELECCIONE DEDICACIÓN</option>
          <option value="TIEMPO COMPLETO">TIEMPO COMPLETO</option>
          <option value="MEDIO TIEMPO">MEDIO TIEMPO</option>
          <option value="CÁTEDRA">CÁTEDRA</option>
          <option value="INVESTIGADOR">INVESTIGADOR</option>
          <option value="HONORARIOS">HONORARIOS</option>
        </select>

        {/* Años Experiencia: Cambiado a type="text" para controlar mejor la entrada de solo números */}
        <input 
          name="aniosExperiencia" 
          type="text" 
          placeholder="AÑOS DE EXPERIENCIA" 
          value={formData.aniosExperiencia === 0 ? '' : formData.aniosExperiencia} 
          onChange={handleChange} 
        />
        
        <button type="submit" className="btn-guardar">
          {editIndex !== null ? 'ACTUALIZAR DOCENTE' : 'GUARDAR DOCENTE'}
        </button>
      </div>
    </form>
  );
};

export default DocenteForm;