const express = require("express");
const listViewRouter = express.Router();
const listaTareas = require("./arrayListaTareas");
const validateToken = require('./middleware-validate-token')
const middleware = require('./middlewares')

//estas rutas contiene 2 middlewares, uno que valida el token JWT, y otro que se encarga de dar un error
// en caso de que las rutas esten mal escritas.
listViewRouter.use(validateToken, middleware.validarRutas);

listViewRouter.get("/", (req, res) => {
  res.json(listaTareas);
});

listViewRouter.get("/completas", (req, res) => {
  const buscarTarea = listaTareas.filter((buscar) => buscar.completada === true)
  res.json({tareasCompletas: buscarTarea});
});

listViewRouter.get("/incompletas", (req, res) => {
  const buscarTarea = listaTareas.filter((buscar) => buscar.completada === false)
  res.json({tareasIncompletas: buscarTarea})
});

module.exports = listViewRouter;