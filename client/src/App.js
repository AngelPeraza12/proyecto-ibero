import { useState, useEffect } from 'react';
import './App.css';
import DocenteForm from './components/DocenteForm';
import DocenteTable from './components/DocenteTable';
import { docenteService } from './services/docenteService';
import { validateTelefono } from './utils/validaciones';

function App() {
  const [registros, setRegistros] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  
  // Estado unificado (Esto soluciona los errores de tu imagen)
  const [formData, setFormData] = useState({
    nombre: '', correo: '', telefono: '', titulo: '',
    areaAcademica: '', dedicacion: '', aniosExperiencia: 0
  });

  useEffect(() => { cargarDocentes(); }, []);

  const cargarDocentes = async () => {
    try {
      const data = await docenteService.getAll();
      setRegistros(data);
    } catch (error) { alert('Error al cargar datos'); }
  };

  const registrarDatos = async (e) => {
    e.preventDefault();
    
    // Si el teléfono tiene algo escrito y NO cumple con la regla de 6-10 dígitos
    if (formData.telefono && !validateTelefono(formData.telefono)) {
      alert('El teléfono debe tener entre 6 y 10 dígitos.');
      return; // Este "return" es clave: detiene la función y no deja que siga al fetch
    };

    // Convertir a MAYÚSCULAS antes de enviar
    const payload = {
      nombre: formData.nombre.toUpperCase().trim(),
      correo: formData.correo,
      telefono: formData.telefono,
      titulo: formData.titulo.toUpperCase().trim(),
      area_academica: formData.areaAcademica,
      dedicacion: formData.dedicacion,
      anios_experiencia: parseInt(formData.aniosExperiencia)
    };

    try {
      let res = editIndex !== null 
        ? await docenteService.update(registros[editIndex].id, payload)
        : await docenteService.create(payload);

      if (res.ok) {
        alert(editIndex !== null ? 'Docente actualizado' : 'Docente guardado');
        setEditIndex(null);
        setFormData({ nombre: '', correo: '', telefono: '', titulo: '', areaAcademica: '', dedicacion: '', aniosExperiencia: 0 });
        cargarDocentes();
      }
    } catch (error) { alert('Error en el servidor'); }
  };

  const editarRegistro = (idx) => {
    const reg = registros[idx];
    setFormData({
      nombre: reg.nombre,
      correo: reg.correo,
      telefono: reg.telefono,
      titulo: reg.titulo,
      areaAcademica: reg.area_academica,
      dedicacion: reg.dedicacion,
      aniosExperiencia: reg.anios_experiencia
    });
    setEditIndex(idx);
  };

  const eliminarRegistro = async (idx) => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este docente? Esta acción no se puede deshacer.");
    if (!confirmacion) return;

    try {
      const res = await docenteService.delete(registros[idx].id);
      if (res.ok) {
        alert('Eliminado correctamente');
        cargarDocentes();
      }
    } catch (error) { alert('Error al eliminar'); }
  };

  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1>Gestión de Docentes</h1>
      <DocenteForm 
        formData={formData} 
        setFormData={setFormData} 
        onSubmit={registrarDatos} 
        editIndex={editIndex} 
      />
      <DocenteTable 
        registros={registros} 
        onEdit={editarRegistro} 
        onDelete={eliminarRegistro} 
      />
    </div>
  );
}

export default App;