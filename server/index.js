const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());

app.use(express.json());

//peticiones

app.get('/docentes', (req, res) => {
    const sql = 'SELECT * FROM docentes';

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({error: 'error al obtener los docentes'});
        }
        res.json(results);
    });
});

//consulta por id
app.get('/docentes/:id', (req, res) => {

    const {id} = req.params;

    const sql = 'SELECT * FROM docentes WHERE id = ?';

    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({error: 'error al obtener el docentes'});
        }
        if (!results.length) {
            return res.status(404).json({ error: 'Docente no encontrado'})
        }
        res.json(results[0]);
    });
});

app.post('/docentes', (req, res) => {
    console.log("Datos recibidos en el servidor:", req.body);
    const {nombre, correo, telefono, titulo, area_academica, dedicacion, anios_experiencia} = req.body;
    // con .trim evito que almacene datos basura como los espacios en blanco
    if (!nombre?.trim() || !correo?.trim() || !telefono?.trim() || !titulo?.trim() || !area_academica?.trim() || !dedicacion?.trim()) {
        return res.status(400).json({error: 'Todos los campos son requeridos'});
    }

    const anios = Number(anios_experiencia);

    if(anios_experiencia === undefined || anios === null || Number.isNaN(anios) || anios < 0 ) {
        return res.status(400).json({ error: 'anios de experiencia invalido'});
    };

    const sql = 'INSERT INTO docentes (nombre, correo, telefono, titulo, area_academica, dedicacion, anios_experiencia) VALUES (?,?,?,?,?,?,?)';

    db.query(sql, [nombre.trim(), correo.trim(), telefono.trim(), titulo.trim(), area_academica.trim(), dedicacion.trim(), anios], (err, result) => {
        if(err){
            return res.status(500).json({error: 'error al guardar el docente'});
        }

        res.json({
            id: result.insertId,
            nombre: nombre.trim(),
            correo: correo.trim(), 
            telefono: telefono.trim(), 
            titulo: titulo.trim(), 
            area_academica: area_academica.trim(), 
            dedicacion: dedicacion.trim(), 
            anios_experiencia: anios
        });

    });    
    
});

app.put('/docentes/:id', (req, res) => {
    const { id } = req.params;
    const {nombre, correo, telefono, titulo, area_academica, dedicacion, anios_experiencia} = req.body;

    if (!nombre?.trim() || !correo?.trim() || !telefono?.trim() || !titulo?.trim() || !area_academica?.trim() || !dedicacion?.trim()) {
        return res.status(400).json({error: 'Todos los campos son requeridos'});
    }

    const anios = Number(anios_experiencia);

    if(anios_experiencia === undefined || anios === null || Number.isNaN(anios) || anios < 0 ) {
        return res.status(400).json({ error: 'anios de experiencia invalido'});
    };

    const sql = 'UPDATE docentes SET nombre=?, correo=?, telefono=?, titulo=?, area_academica=?, dedicacion=?, anios_experiencia=? WHERE id=?';

    db.query(sql, [nombre.trim(), correo.trim(), telefono.trim(), titulo.trim(), area_academica.trim(), dedicacion.trim(), anios, id], (err) => {
        if(err){
            return res.status(500).json({error: 'Error al actualizar docente'});
        }
        return res.json({message: 'Docente actualizado'});
    });
});

app.delete('/docentes/:id', (req, res) => {
    const { id } = req.params;
   
    const sql = 'DELETE FROM docentes WHERE id=?';

    db.query(sql, [id], (err) => {
        if(err){
            return res.status(500).json({error: 'error al eliminar el docente'});
        }
        return res.json({message: 'Docente Eliminado'});
    });
});

app.listen(3001, () => {
    console.log('Servidor backend corriendo en el puerto 3001')
    
});