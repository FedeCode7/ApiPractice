require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;

app.use(express.json());


app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

let notas = [];

// Obtener todas las notas
app.get('/notas', (req, res) => {
  res.json(notas);
});

// Obtener una nota por su ID
app.get('/notas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const nota = notas.find(n => n.id === id);
  if (!nota) {
    return res.status(404).json({ mensaje: 'Nota no encontrada' });
  }
  res.json(nota);
});

// Crear una nueva nota
app.post('/notas', (req, res) => {
  const { titulo, contenido } = req.body;
  const nuevaNota = { id: notas.length + 1, titulo, contenido };
  notas.push(nuevaNota);
  res.status(201).json(nuevaNota);
});

// Actualizar una nota existente
app.put('/notas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { titulo, contenido } = req.body;
  const notaIndex = notas.findIndex(n => n.id === id);
  if (notaIndex === -1) {
    return res.status(404).json({ mensaje: 'Nota no encontrada' });
  }
  const notaActualizada = { id, titulo, contenido };
  notas[notaIndex] = notaActualizada;
  res.json(notaActualizada);
});

// Borrar una nota
app.delete('/notas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const notaIndex = notas.findIndex(n => n.id === id);
  if (notaIndex === -1) {
    return res.status(404).json({ mensaje: 'Nota no encontrada' });
  }
  notas.splice(notaIndex, 1);
  res.json({ mensaje: 'Nota eliminada satisfactoriamente' });
});

