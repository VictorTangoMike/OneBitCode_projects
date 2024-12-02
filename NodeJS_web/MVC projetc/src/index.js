const express = require("express");
const path = require("node:path");
const router = require("./routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server is running on  http://localhost:${PORT}`)
);
