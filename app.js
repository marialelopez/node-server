const express = require("express");
const app = express();
const port = 3000;
const listViewRouter = require("./list-view-router");
const listEditRouter = require("./list-edit-router");
const tokenjwt = require('./generate-jwt')
const middleware = require('./middlewares')

app.use(express.json());
app.use(middleware.metodosHTTPermitidos)


app.use("/listadetareas", listViewRouter);
app.use("/editartareas", listEditRouter);
app.use("/", tokenjwt)

//esta es la ruta raiz el cual contiene un sencillo mensaje de bienvenida al servidor, hecho con HTML y CSS
app.get("/" , (req, res) =>{
  res.send(`<!DOCTYPE html>
  <html lang="es">
  <head>
      <title>Login</title>
      <style>
          body{
              background-color: rgb(141, 140, 140);
              display: flex;
              margin: 150px;
              color: white;
          }
          .login{
              background-color: blue;
              padding: 40px;
              box-shadow: 0 0 30px rgb(78, 78, 78);
              border-radius: 15px;
              text-align:left;
              display: inline-block;
              display: block;
              margin-right: auto;
              margin-left: auto;
          }
          h2{
              text-align: center;
          }
      </style>
  </head>
  <body>
      <div class="login">
          <h2>BIENVENIDO AL SERVIDOR DE LISTA DE TAREAS</h2>
  </body>
  </html>`)
})


app.listen(port, () => {
  console.log(`Servidor iniciando ... en el port ${port}`);
});