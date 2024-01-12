const jwt = require('jsonwebtoken');
require('dotenv').config()

// middleware para validar el token, y dar acceso a las rutas GET del archivo list-view-router
function validateToken(req, res, next) {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
      res.send("Token No Valido");
    }
    jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        res.send("Acceso Denegado, Token Incorrecto o No Valido");
      } else {
        next();
      }
    });
  }


  module.exports = validateToken