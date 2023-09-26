const express = require("express");
const router = express.Router();

// Define la lista de tareas
const listaDeTareas = [
  { id: 1, descripcion: "Hacer compras", completado: false },
  { id: 2, descripcion: "Lavar la ropa", completado: true },
  { id: 3, descripcion: "Estudiar para el examen", completado: false },
];

function esTareaValida(tarea) {
  return tarea && tarea.descripcion && typeof tarea.completado === "boolean";
}

function validarTareaMiddleware(req, res, next) {
  const tarea = req.body;

  if (!tarea) {
    return res.status(400).json({ error: "Cuerpo de la solicitud vacío" });
  }

  if (!esTareaValida(tarea)) {
    return res
      .status(400)
      .json({ error: "Información de tarea no válida o faltante" });
  }

  next();
}
function validarMetodoHTTP(req, res, next) {
  const metodo = req.method;

  const metodosValidos = ["GET", "POST", "PUT", "DELETE"];

  if (!metodosValidos.includes(metodo)) {
    return res.status(405).json({ error: "Método HTTP no válido" });
  }

  next();
}

router.post("/crear", validarTareaMiddleware, (req, res) => {
  const nuevaTarea = req.body;
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
router.put("/actualizar/:id", validarTareaMiddleware, (req, res) => {
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
