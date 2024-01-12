const express = require("express");
const tokenJwt = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Array con unas lista de usuarios, para darles acceso al generar el JWT
let usuarios = [
  {
    id:1,
    user: "ale",
    password: 1234,
  },
  {
    id:2,
    user: "maria",
    password: 12345,
  },
  {
    id:3,
    user: "marce",
    password: 12346,
  },
  {
    id:4,
    user: "ariana",
    password: 12347,
  },
  {
    id:5,
    user: "rolly",
    password: 12348,
  },
];

//esta es la ruta post, donde generamons el token en caso de pasar un nombre y contraseña que este en el array
// de usuarios, de lo contrario dara un error.
tokenJwt.post("/login", (req, res) => {
  const { username, password } = req.body;
  const userEncontrado = usuarios.find(
    (user) => user.user === username && user.password === password
  );
  if (userEncontrado) {
    const accessToken = jwt.sign(userEncontrado, process.env.SECRET_KEY, {expiresIn: '50m'});
    res.header("authorization", accessToken).json({
      message: "usuario autenticado",
      token: accessToken,
    });
  } else {
    res.json("usuario y contraseña no validos");
  }
});



module.exports = tokenJwt