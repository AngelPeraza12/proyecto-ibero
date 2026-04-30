import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [titulo, setTitulo] = useState('');
  const [areaAcademica, setAreaAcademica] = useState('');
  const [dedicacion, setDedicacion] = useState('');
  const [aniosExperiencia, setAniosExperiencia] = useState(0);
  const [registros, setRegistros] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    cargarDocentes();
  }, []);

  const cargarDocentes = async () => {
    try {
      const response = await fetch('http://localhost:3001/docentes');
      const data = await response.json();
      setRegistros(data);
    } catch (error) {
      alert('Error al cargar los docentes');
    }
  };

  const limpiarFormulario = () => {
    setNombre('');
    setCorreo('');
    setTelefono('');
    setTitulo('');
    setAreaAcademica('');
    setDedicacion('');
    setAniosExperiencia(0);
  };

  const registrarDatos = async (e) => {
    e.preventDefault();

    const payload = {
      nombre,
      correo,
      telefono,
      titulo,
      area_academica: areaAcademica,
      dedicacion,
      anios_experiencia: parseInt(aniosExperiencia)
    };

    if (editIndex !== null) {
      // Lógica de ACTUALIZAR (PUT)
      try {
        const docente = registros[editIndex];
        const response = await fetch(`http://localhost:3001/docentes/${docente.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          const nuevosRegistros = [...registros];
          nuevosRegistros[editIndex] = { ...docente, ...payload };
          setRegistros(nuevosRegistros);
          setEditIndex(null);
          limpiarFormulario();
          alert('Docente actualizado correctamente');
        } else {
          alert('Error al actualizar el docente');
        }
      } catch (error) {
        alert('Error de conexión al actualizar');
      }
    } else {
      // Lógica de GUARDAR (POST)
      try {
        const response = await fetch('http://localhost:3001/docentes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await response.json();
        if (response.ok) {
          setRegistros([...registros, data]);
          alert('Docente Guardado correctamente');
          limpiarFormulario();
        } else {
          alert(data.error || 'Error al guardar el docente');
        }
      } catch (error) {
        alert('Error de conexión al guardar');
      }
    }
  };

 const eliminarRegistro = async (idx) => {
  // --- AÑADE ESTO AQUÍ ---
  const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este docente? Esta acción no se puede deshacer.");
  
  if (!confirmacion) {
    return; // Si el usuario cancela, la función se detiene aquí
  }
  // -----------------------

  const docente = registros[idx];
  try {
    const response = await fetch(`http://localhost:3001/docentes/${docente.id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setRegistros(registros.filter((_, i) => i !== idx));
      if (editIndex === idx) {
        setEditIndex(null);
        limpiarFormulario();
      }
      alert('Docente eliminado correctamente');
    } else {
      alert('Error al eliminar el docente');
    }
  } catch (error) {
    alert('Error de conexión al eliminar');
  }
};

  const editarRegistro = (idx) => {
    const reg = registros[idx];
    setNombre(reg.nombre);
    setCorreo(reg.correo);
    setTelefono(reg.telefono);
    setTitulo(reg.titulo);
    setAreaAcademica(reg.area_academica);
    setDedicacion(reg.dedicacion);
    setAniosExperiencia(reg.anios_experiencia);
    setEditIndex(idx);
  };

  return (
  <div className="App" style={{ padding: '20px' }}>
    <h1>Gestión de Docentes</h1>

    {/* Formulario */}
    <form onSubmit={registrarDatos}>
  <div className="form-container">
    <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required maxLength="100" />
    <input type="email" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} required maxLength="100"/>
    <input type="tel" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
    <input type="text" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} required maxLength="100" />
      <select 
      value={areaAcademica} 
      onChange={(e) => setAreaAcademica(e.target.value)}
      required
    >
      <option value="" disabled>Seleccione Área Académica</option>
      <option value="Administración y Negocios">Administración y Negocios</option>
      <option value="Artes y Humanidades">Artes y Humanidades</option>
      <option value="Ciencias Biológicas y Salud">Ciencias Biológicas y Salud</option>
      <option value="Ciencias Exactas y Naturales">Ciencias Exactas y Naturales</option>
      <option value="Ciencias Sociales">Ciencias Sociales</option>
      <option value="Contaduría y Finanzas">Contaduría y Finanzas</option>
      <option value="Derecho y Leyes">Derecho y Leyes</option>
      <option value="Educación y Pedagogía">Educación y Pedagogía</option>
      <option value="Ingeniería y Tecnología">Ingeniería y Tecnología</option>
      <option value="Psicología y Bienestar">Psicología y Bienestar</option>
    </select>
    <select 
  value={dedicacion} 
  onChange={(e) => setDedicacion(e.target.value)}
  required
>
  <option value="" disabled>Seleccione Dedicación</option>
  <option value="Tiempo Completo">Tiempo Completo</option>
  <option value="Medio Tiempo">Medio Tiempo</option>
  <option value="Cátedra">Cátedra</option>
  <option value="Investigador">Investigador</option>
  <option value="Honorarios">Honorarios</option>
</select>
    <input 
  type="number" 
  placeholder="Años de experiencia" 
  value={aniosExperiencia === 0 ? '' : aniosExperiencia} 
  onChange={(e) => setAniosExperiencia(e.target.value)} 
/>
    
    <button type="submit" className="btn-guardar">
      {editIndex !== null ? 'Actualizar Docente' : 'Guardar Docente'}
    </button>
  </div>
</form>

    {/* Tabla de Registros */}
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
          <button className="btn-editar" onClick={() => editarRegistro(index)}>Editar</button>
          <button className="btn-eliminar" onClick={() => eliminarRegistro(index)}>Eliminar</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
    
    
  </div>
);
}

export default App;
