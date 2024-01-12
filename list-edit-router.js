const express = require("express");
const listEditRouter = express.Router();
const listaTareas = require("./arrayListaTareas");
const middlewares = require('./middlewares')

//en esta ruta podemos buscar un tarea, proporcionando el id por parametro, tambien contiene un middleware
//que da un error en caso de colocar una letra o un numero negativo
listEditRouter.get("/buscar/:id", middlewares.validarIdParametro, (req, res) => {
  const id = parseInt(req.params.id);
  const tareaBuscada = listaTareas.find((tarea) => tarea.id === id)
  if (!tareaBuscada) {
    res.status(404).json({
      error: "No se encontro la tarea con ese id, porque no existe",
    });
  } else {
    res.status(200).json(tareaBuscada)
  }
});

//ruta para crear una nueva tarea
listEditRouter.post("/crear", middlewares.manejarErrores, (req, res) => {
  const nuevaTarea = {...req.body, completada: false}
  listaTareas.push(nuevaTarea)
  res.status(201).json({nuevaTareaCreada: nuevaTarea})
});


//ruta para actualizar una tarea
listEditRouter.put("/actualizar/:id", middlewares.manejarErrores, (req, res) => {
  const id = parseInt(req.params.id);
  const tareaActualizada = req.body;
  const tareaBuscada = listaTareas.find((tarea) => tarea.id === id)
  if (!tareaBuscada){
    res.json("No se encontro la tarea con ese id")
  }else{
    tareaBuscada.descripcion = tareaActualizada.descripcion
    tareaBuscada.completada = tareaActualizada.completada
    res.status(200).json("Tarea Actualizada exitosamente")
  }
});

//Ruta para borrar una tarea
listEditRouter.delete("/borrar/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = listaTareas.findIndex((borrar) => borrar.id === id)
  if (index === -1 ) {
    res.status(400).json({
      status: 400,
      message: `No puedes borrar la tarea con id ${id} porque no existe`,
    });
  } else {
    listaTareas.splice(index, 1)
    res.json({
      message: `la tarea con id ${id} ha sido eliminada`,
    });
  }
});

module.exports = listEditRouter;