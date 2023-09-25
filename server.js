const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const host = "localhost";

const listViewRouter = require("./listViewRouter");
const listEditRouter = require("./listEditRouter");

app.use(bodyParser.json());

app.use("/listar", listViewRouter);
app.use("/editar", listEditRouter);

app.listen(port, host, () => {
  console.log(`Servidor escuchando en ${host}:${port}`);
});
