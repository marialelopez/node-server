const express = require("express");
const router = express.Router();

const listaDeTareas = [
  { id: 1, descripcion: "Hacer compras", completado: false },
  { id: 2, descripcion: "Lavar la ropa", completado: true },
  { id: 3, descripcion: "Estudiar para el examen", completado: false },
];

// Ruta para crear una nueva tarea con (POST)
router.post("/crear", (req, res) => {
  const nuevaTarea = req.body; // Debes enviar la tarea en el cuerpo de la solicitud
  listaDeTareas.push(nuevaTarea);
  res.json({ mensaje: "Tarea creada exitosamente" });
});

// Ruta para eliminar una tarea por ID con (DELETE)
router.delete("/eliminar/:id", (req, res) => {
  const tareaId = parseInt(req.params.id);
  const index = listaDeTareas.findIndex((tarea) => tarea.id === tareaId);

  if (index !== -1) {
    listaDeTareas.splice(index, 1);
    res.json({ mensaje: "Tarea eliminada exitosamente" });
  } else {
    res.status(404).json({ error: "Tarea no encontrada" });
  }
});

// Ruta para actualizar una tarea por ID (PUT)
router.put("/actualizar/:id", (req, res) => {
  const tareaId = parseInt(req.params.id);
  const tareaActualizada = req.body;

  for (let i = 0; i < listaDeTareas.length; i++) {
    if (listaDeTareas[i].id === tareaId) {
      listaDeTareas[i] = tareaActualizada;
      return res.json({ mensaje: "Tarea actualizada exitosamente" });
    }
  }

  res.status(404).json({ error: "Tarea no encontrada" });
});

module.exports = router;
