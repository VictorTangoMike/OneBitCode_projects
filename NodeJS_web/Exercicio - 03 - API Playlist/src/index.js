const express = require("express");
const router = require("./router");

const app = express();

app.use(express.json());

app.use(router);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`Servidor iniciado em http://localhost:${PORT}/`)
);
