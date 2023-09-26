const express = require("express");
const router = express.Router();

const listaDeTareas = [
  { id: 1, descripcion: "Hacer compras", completado: false },
  { id: 2, descripcion: "Lavar la ropa", completado: true },
  { id: 3, descripcion: "Estudiar para el examen", completado: false },
];

function validarParametrosMiddleware(req, res, next) {
  const parametro = req.params.parametro;

  if (parametro === "completas" || parametro === "incompletas") {
    next();
  } else {
    res.status(400).json({ error: "Parámetro no válido" });
  }
}
// Ruta para listar tareas completas
router.get("/completas", (req, res) => {
  const tareasCompletas = listaDeTareas.filter((tarea) => tarea.completado);
  res.json(tareasCompletas);
});

// Ruta para listar tareas incompletas
router.get("/incompletas", (req, res) => {
  const tareasIncompletas = listaDeTareas.filter((tarea) => !tarea.completado);
  res.json(tareasIncompletas);
});

module.exports = router;
