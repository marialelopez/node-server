const metodosHTTPermitidos = (req, res, next)=>{
    const metodosHTTP = ['GET' , 'POST', 'PUT', 'DELETE']
    if (metodosHTTP.includes(req.method)){
    next()
    }else{
      res.status(400).json({error: 'Metodo HTTP no permitido'})
    }
    }


//Middleware que nos permite validar que las rutas sean correctas
function validarRutas(req, res, next) {
    const rutasValidas = ["/", "/completas", "/incompletas"];
    if (rutasValidas.includes(req.path)) {
      next();
    } else {
      return res.status(402).json({
        error: "Ruta Invalida",
        message:
          "Por favor utiliza una de las rutas validas: /, /completas o /incompletas",
      });
    }
  }


  // middleware para validar que el numero enviado como parametro sea un numero positivo, para buscar una tarea
function validarIdParametro(req, res, next) {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        error: "ingresa un numero valido",
      });
    } else {
      next();
    }
  }

  
//Middleware que maneja errores retornando un código de respuesta 400:
//Solicitudes POST y PUT con el cuerpo vacio
//Solicitudes POST y PUT que tengan información no valida
function manejarErrores(req, res, next) {
    if (req.method === "POST") {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
          errorMessage: "el cuerpo no puede estar vacio, intenta nuevamente",
        });
      }
    }
    if (req.method === "POST" && (!req.body.id || !req.body.descripcion)) {
      return res.status(400).json({
        errorMessage:
          "para crear una tarea debes agregar un id y una descripcion",
      });
    }
    if (req.method === "PUT") {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res
          .status(400)
          .json({ errorMessage: "El cuerpo de la tarea no puede estar vacio" });
      }
    }
    if (req.method === "PUT" && (!req.body.descripcion || !req.body.completada)) {
      return res
        .status(400)
        .json({
          errorMessage:
            "Debes agregar una descripcion y un estado de completada validos",
        });
    }
  
    next();
  }

    module.exports = {metodosHTTPermitidos, validarRutas, validarIdParametro, manejarErrores}