import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './App.css';
import DocenteForm from './components/DocenteForm';
import DocenteTable from './components/DocenteTable';
import { docenteService } from './services/docenteService';
import { validateEmail, validateSoloLetras, validateTelefono} from './utils/validaciones';

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
    
    // 1. Validación de campos obligatorios
    if (!formData.nombre || !formData.correo || !formData.areaAcademica) {
      alert("Por favor completa todos los campos obligatorio - nombre correo y area");
      return;
    }

    // 2. Validación de Nombre (Solo letras)
    if (!validateSoloLetras(formData.nombre)) {
      alert('El nombre solo debe contener letras.');
      return;
    }

    // 3. Validación de Correo
    if (!validateEmail(formData.correo)) {
      alert('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    // 4. Validación de Teléfono
    if (formData.telefono && !validateTelefono(formData.telefono)) {
      alert('El teléfono debe tener entre 6 y 10 dígitos.');
      return;
    }

    // 5. Validación de Años de Experiencia (No negativos)
    if (parseInt(formData.aniosExperiencia) < 0) {
      alert('Los años de experiencia no pueden ser negativos.');
      return;
    }

    // Convertir a MAYÚSCULAS antes de enviar
    const payload = {
      nombre: formData.nombre.toUpperCase().trim(),
      correo: formData.correo.toLocaleLowerCase().trim(),
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
        Swal.fire({
          title: editIndex !== null ? '¡Actualizado!' : '¡Guardado!',
          text: editIndex !== null ? 'Docente actualizado con éxito' : 'Docente registrado correctamente',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          background: '#1a1a1a', // Para que combine con tu fondo oscuro
          color: '#fff'
        });
        // ... resto de tu lógica (limpiar form, cargar docentes)
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

    // ESTO ENVÍA AL USUARIO AL INICIO DE LA PÁGINA
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // 'smooth' hace que el movimiento sea animado y no un salto brusco
    });
  };

  const eliminarRegistro = async (idx) => {
    Swal.fire({
      title: '¿Estás seguro, Quieres eliminar?',
      text: "Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      background: '#1a1a1a',
      color: '#fff'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await docenteService.delete(registros[idx].id);
          if (res.ok) {
            Swal.fire({
              title: '¡Eliminado!',
              icon: 'success',
              background: '#1a1a1a',
              color: '#fff'
            });
            cargarDocentes();
          }
        } catch (error) {
          Swal.fire('Error', 'No se pudo eliminar el registro', 'error');
        }
      }
    });
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