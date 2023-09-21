const http = require("http");
const port = 3000;
const host = "localhost";
const listaDeTareas = [
  { id: 1, descripcion: "Hacer compras", completado: false },
  { id: 2, descripcion: "Lavar la ropa", completado: true },
  { id: 3, descripcion: "Estudiar para el examen", completado: false },
];

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.method === "GET" && req.url === "/tareas") {
    res.end(JSON.stringify(listaDeTareas));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Ruta no encontrada" }));
  }
});

server.listen(port, host, () => {
  console.log(`Servidor escuchando en  ${host} ${port}`);
});
